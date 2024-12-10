using Ecommerce.Infra.Context;
using Ecommerce.Infra.Entities;
using Ecommerce.Services.Abstractions;
using Ecommerce.Shared.Args;
using Ecommerce.Shared.Enums;
using Ecommerce.Shared.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Text.Json;

namespace Ecommerce.Services.Core;

public class PedidoService(
    ILogger<PedidoService> logger,
    EcommerceContext context,
    HttpClient httpClient) : IPedidoService
{
    public async Task<PedidoModel> ProcessarVendaAsync(PedidoPostArgs args)
    {
        var pedidoExistente = await context.Pedidos
            .FirstOrDefaultAsync(p => p.Identificador == args.Identificador);

        if (pedidoExistente is not null)
        {
            throw new InvalidOperationException("Pedido já existente com este identificador.");
        }

        var cliente = new Cliente
        {
            ClienteId = args.Cliente.ClienteId,
            Nome = args.Cliente.Nome,
            CPF = args.Cliente.CPF,
            Categoria = args.Cliente.Categoria
        };

        var itensPedido = args.Itens.Select(i => new PedidoItem
        {
            ProdutoId = i.ProdutoId,
            Descricao = i.Descricao,
            Quantidade = i.Quantidade,
            PrecoUnitario = Math.Round(i.PrecoUnitario, 2, MidpointRounding.ToZero) // Garantir precisão
        }).ToList();

        // variável separada para não ser computado novamente
        decimal subTotal = itensPedido.Sum(i => i.Quantidade * i.PrecoUnitario);

        var pedido = new Pedido
        {
            Identificador = args.Identificador,
            DataVenda = args.DataVenda,
            Cliente = cliente,
            Itens = itensPedido,
            SubTotal = Math.Round(subTotal, 2, MidpointRounding.ToZero),
            Status = PedidoStatus.PENDENTE,
        };

        pedido.Desconto = Math.Round(ObterDesconto(subTotal, cliente.Categoria), 2, MidpointRounding.ToZero);
        pedido.ValorTotal = Math.Round(subTotal - pedido.Desconto, 2, MidpointRounding.ToZero);

        await context.Database.BeginTransactionAsync();
        try
        {
            await context.AddAsync(pedido); // EF Core adiciona automaticamente Cliente e Itens
            await context.SaveChangesAsync();

            await EnviarParaFaturamento(pedido);

            await context.Database.CommitTransactionAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Erro ao processar venda.");
            await context.Database.RollbackTransactionAsync();
            throw;
        }

        return pedido.ToModel();
    }

    private async Task EnviarParaFaturamento(Pedido pedido)
    {
        var sumario = new SumarioFaturamentoPostArgs
        {
            Identificador = pedido.Identificador,
            SubTotal = Math.Round(pedido.SubTotal, 2, MidpointRounding.ToZero),
            Descontos = Math.Round(pedido.Desconto, 2, MidpointRounding.ToZero),
            ValorTotal = Math.Round(pedido.ValorTotal, 2, MidpointRounding.ToZero),
            Itens = pedido.Itens.Select(i => new SumarioFaturamentoItemPostArgs
            {
                Quantidade = i.Quantidade,
                PrecoUnitario = Math.Round(i.PrecoUnitario, 2, MidpointRounding.ToZero)
            }).ToList()
        };

        var json = JsonSerializer.Serialize(sumario);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        //try
        //{
        //    var response = await httpClient.PostAsync("/vendas", content);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        // Atualiza o status do pedido para CONCLUIDO
        //        pedido.Status = PedidoStatus.CONCLUIDO;
        //        context.Update(pedido);
        //        await context.SaveChangesAsync();
        //    }
        //    else
        //    {
        //        // Trata erros do serviço de faturamento
        //        var errorMessage = await response.Content.ReadAsStringAsync();
        //        throw new Exception($"Erro no serviço de faturamento: {errorMessage}");
        //    }
        //}
        //catch (HttpRequestException ex)
        //{
        //    throw new Exception("Erro ao enviar pedido para o serviço de faturamento.", ex);
        //}
    }

    public async Task<IReadOnlyCollection<PedidoModel>> ObterVendasAsync()
    {
        var vendas = await context.Pedidos
            .Include(p => p.Cliente)
            .Include(p => p.Itens)
            .ToListAsync();

        return [.. vendas.Select(v => v.ToModel())];
    }

    public async Task<PedidoModel?> ObterPedidoAsync(Guid pedidoId)
    {
        var venda = await context.Pedidos
            .Include(p => p.Cliente)
            .Include(p => p.Itens)
            .FirstOrDefaultAsync(p => p.Identificador == pedidoId);

        return venda?.ToModel();
    }

    public async Task<PedidoModel?> AlterarPedidoPendenteAsync(Guid id, PedidoPutArgs args)
    {
        var pedido = await context.Pedidos
            .Include(p => p.Cliente)
            .Include(p => p.Itens)
            .Where(p => p.Status == PedidoStatus.PENDENTE)
            .FirstOrDefaultAsync(p => p.Identificador == id);

        if (pedido is null)
        {
            return null;
        }

        // Pedido
        pedido.DataVenda = args.DataVenda;

        // Cliente
        pedido.Cliente.Nome = args.Cliente.Nome;
        pedido.Cliente.CPF = args.Cliente.CPF;
        pedido.Cliente.Categoria = args.Cliente.Categoria;

        // Swap dos itens (Provavelmente faria um endpoint a parte só para alteração dos itens)
        var itensAtuais = pedido.Itens.ToDictionary(i => i.ProdutoId);
        var itensNovos = args.Itens.Select(i => new PedidoItem
        {
            ProdutoId = i.ProdutoId,
            Descricao = i.Descricao,
            Quantidade = i.Quantidade,
            PrecoUnitario = i.PrecoUnitario
        }).ToList();

        foreach (var itemNovo in itensNovos)
        {
            if (itensAtuais.TryGetValue(itemNovo.ProdutoId, out var itemAtual))
            {
                itemAtual.Descricao = itemNovo.Descricao;
                itemAtual.Quantidade = itemNovo.Quantidade;
                itemAtual.PrecoUnitario = itemNovo.PrecoUnitario;
            }
            else
            {
                pedido.Itens.Add(itemNovo);
            }
        }

        // Remover itens que não estão mais no pedido
        var itensRemovidos = itensAtuais.Keys.Except(itensNovos.Select(i => i.ProdutoId)).ToList();

        foreach (var itemRemovido in itensRemovidos)
        {
            pedido.Itens.Remove(itensAtuais[itemRemovido]);
        }

        // Recalcular valores
        var subTotal = pedido.Itens.Sum(i => i.Quantidade * i.PrecoUnitario);
        pedido.SubTotal = subTotal;
        pedido.Desconto = ObterDesconto(subTotal, pedido.Cliente.Categoria);
        pedido.ValorTotal = subTotal - pedido.Desconto;

        await context.Database.BeginTransactionAsync();
        try
        {
            context.Update(pedido);
            await context.SaveChangesAsync();
            await context.Database.CommitTransactionAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Erro ao alterar pedido.");
            await context.Database.RollbackTransactionAsync();
            throw;
        }

        return pedido?.ToModel();
    }


    private decimal ObterDesconto(decimal subTotal, ClienteCategoria categoria) => categoria switch
    {
        ClienteCategoria.REGULAR => subTotal > 500 ? 0.05m * subTotal : 0m,
        ClienteCategoria.PREMIUM => subTotal > 300 ? 0.10m * subTotal : 0m,
        ClienteCategoria.VIP => 0.15m * subTotal,
        _ => 0m,
    };
}