using Ecommerce.Infra.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce.Infra.Configurations;

internal sealed class PedidoItemConfiguration
    : IEntityTypeConfiguration<PedidoItem>
{
    public void Configure(EntityTypeBuilder<PedidoItem> builder)
    {
        builder.HasKey(i => i.Id);

        builder
            .Property(i => i.Quantidade)
            .HasColumnType("decimal(16,2)")
            .IsRequired();

        builder
            .Property(i => i.PrecoUnitario)
            .HasColumnType("decimal(16,2)")
            .IsRequired();

        builder
            .Property(i => i.Descricao)
            .HasMaxLength(100)
            .IsRequired();

        // Relacionamento PEDIDO
        builder
            .HasOne(i => i.Pedido)
            .WithMany(p => p.Itens)
            .HasForeignKey(i => i.PedidoId)
            .OnDelete(DeleteBehavior.Cascade); // Exclui os itens do pedido quando o pedido for excluído
    }
}
