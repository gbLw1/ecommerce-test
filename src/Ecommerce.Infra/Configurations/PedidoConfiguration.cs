using Ecommerce.Infra.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce.Infra.Configurations;

internal sealed class PedidoConfiguration
    : IEntityTypeConfiguration<Pedido>
{
    public void Configure(EntityTypeBuilder<Pedido> builder)
    {
        builder.HasKey(p => p.Id);

        builder
            .Property(p => p.SubTotal)
            .HasColumnType("decimal(16,2)");

        builder
            .Property(p => p.Desconto)
            .HasColumnType("decimal(16,2)");

        builder
            .Property(p => p.ValorTotal)
            .HasColumnType("decimal(16,2)");

        builder
            .Property(p => p.Status)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();

        // Relacionamento CLIENTE
        builder
            .HasOne(p => p.Cliente)
            .WithMany() // Muitos pedidos para um cliente
            .HasForeignKey(c => c.ClienteId) // Estabelecendo a FK
            .OnDelete(DeleteBehavior.Restrict); // Restringindo a exclusão do cliente

        // Relacionamento PEDIDO ITEM
        builder
            .HasMany(p => p.Itens)
            .WithOne(i => i.Pedido)
            .HasForeignKey(i => i.PedidoId)
            .OnDelete(DeleteBehavior.Cascade); // Exclui os itens do pedido quando o pedido for excluído
    }
}
