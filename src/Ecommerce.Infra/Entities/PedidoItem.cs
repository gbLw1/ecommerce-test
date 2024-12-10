namespace Ecommerce.Infra.Entities;

public sealed class PedidoItem
{
    public Guid Id { get; set; }
    public int ProdutoId { get; set; }
    public required string Descricao { get; set; }
    public decimal Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }
    public decimal ValorTotal => Quantidade * PrecoUnitario;

    public Guid PedidoId { get; set; } // FK para o Pedido
    public Pedido Pedido { get; set; } = null!;
}
