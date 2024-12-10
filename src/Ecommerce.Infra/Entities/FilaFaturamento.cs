namespace Ecommerce.Infra.Entities;

public sealed class FilaFaturamento
{
    public int Id { get; set; }
    public Guid PedidoId { get; set; }
    public required string Payload { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
    public int Tentativas { get; set; } = 0;
}
