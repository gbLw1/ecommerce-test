using Ecommerce.Infra.Context;
using Ecommerce.Infra.Entities;
using Ecommerce.Services.Backgrounds;
using Ecommerce.Shared.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text;

public class FilaFaturamentoProcessor(
    ILogger<FilaFaturamentoProcessor> logger,
    IServiceProvider serviceProvider,
    FaturamentoServiceClient faturamentClient)
    : BackgroundService
{
    private const int MAX_TENTATIVAS = 5;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using PeriodicTimer timer = new(TimeSpan.FromSeconds(30));
        logger.LogInformation("--> Iniciando processamento de fila de faturamento.");

        while (!stoppingToken.IsCancellationRequested)
        {
            await timer.WaitForNextTickAsync(stoppingToken);
            logger.LogInformation($"--> Processamento de fila executado em: {DateTime.UtcNow}");

            try
            {
                using var scope = serviceProvider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<EcommerceContext>();

                var itensFila = await context.FilaFaturamento
                    .OrderBy(f => f.CriadoEm)
                    .Take(10)
                    .ToListAsync(stoppingToken);

                foreach (var item in itensFila)
                {
                    if (item.Tentativas > MAX_TENTATIVAS)
                    {
                        await DescartarPedido(context, item);
                        continue;
                    }

                    try
                    {
                        logger.LogInformation($"Reenviando pedido {item.PedidoId}");

                        var content = new StringContent(item.Payload, Encoding.UTF8, "application/json");
                        var response = await faturamentClient.HttpClient.PostAsync("/api/vendas", content, stoppingToken);

                        if (response.IsSuccessStatusCode)
                        {
                            await ConcluirPedido(context, item);
                        }
                        else
                        {
                            item.Tentativas++;
                            logger.LogWarning($"Erro no reenvio do pedido {item.PedidoId}: Status {response.StatusCode}");
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, $"Erro ao processar pedido {item.PedidoId}.");
                        item.Tentativas++;
                    }
                }

                await context.SaveChangesAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Erro inesperado. Reiniciando em 1 minuto.");
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }

        logger.LogInformation("--> Finalizando processamento de fila.");
    }

    private async Task AtualizarPedidoStatus(EcommerceContext context, Guid pedidoId, PedidoStatus novoStatus)
    {
        var pedido = await context.Pedidos.FirstOrDefaultAsync(p => p.Identificador == pedidoId);
        if (pedido is not null)
        {
            pedido.Status = novoStatus;
            context.Update(pedido);
        }
    }

    private async Task ConcluirPedido(EcommerceContext context, FilaFaturamento item)
    {
        await context.Database.BeginTransactionAsync();
        try
        {
            await AtualizarPedidoStatus(context, item.PedidoId, PedidoStatus.CONCLUIDO);
            context.FilaFaturamento.Remove(item);
            await context.SaveChangesAsync();
            await context.Database.CommitTransactionAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Erro ao remover da fila ou atualizar o pedido.");
            await context.Database.RollbackTransactionAsync();
            throw;
        }
    }

    private async Task DescartarPedido(EcommerceContext context, FilaFaturamento item)
    {
        await context.Database.BeginTransactionAsync();
        try
        {
            await AtualizarPedidoStatus(context, item.PedidoId, PedidoStatus.CANCELADO);
            context.FilaFaturamento.Remove(item);
            await context.SaveChangesAsync();
            await context.Database.CommitTransactionAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Erro ao descartar pedido.");
            await context.Database.RollbackTransactionAsync();
            throw;
        }
    }
}
