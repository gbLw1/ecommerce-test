using Ecommerce.Shared.Enums;
using Ecommerce.Shared.Models;

namespace Ecommerce.Infra.Entities;

public class Pedido
{
    public Guid Id { get; set; }
    public Guid Identificador { get; set; }
    public DateTime DataVenda { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Desconto { get; set; }
    public decimal ValorTotal { get; set; }
    public PedidoStatus Status { get; set; }

    public Guid ClienteId { get; set; } // FK para o Cliente
    public Cliente Cliente { get; set; } = default!;

    public ICollection<PedidoItem> Itens { get; set; } = new List<PedidoItem>();

    public PedidoModel ToModel() => new()
    {
        Identificador = Identificador,
        DataVenda = DataVenda,
        Cliente = new ClienteModel
        {
            Categoria = Cliente.Categoria,
            ClienteId = Cliente.ClienteId,
            CPF = Cliente.CPF,
            Nome = Cliente.Nome
        },
        Itens = Itens.Select(i => new PedidoItemModel
        {
            Descricao = i.Descricao,
            PrecoUnitario = decimal.Round(i.PrecoUnitario, 2),
            ProdutoId = i.ProdutoId,
            Quantidade = i.Quantidade,
        }).ToList(),
        Desconto = Desconto,
        Status = Status,
        SubTotal = SubTotal,
        Total = ValorTotal
    };
}
