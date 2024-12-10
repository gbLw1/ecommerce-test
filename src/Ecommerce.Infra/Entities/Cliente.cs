using Ecommerce.Shared.Enums;

namespace Ecommerce.Infra.Entities;

public class Cliente
{
    public Guid Id { get; set; }
    public Guid ClienteId { get; set; }
    public required string Nome { get; set; }
    public required string CPF { get; set; }
    public required ClienteCategoria Categoria { get; set; }
}