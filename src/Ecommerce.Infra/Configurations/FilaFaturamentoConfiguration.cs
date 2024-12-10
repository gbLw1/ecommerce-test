using Ecommerce.Infra.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce.Infra.Configurations;

internal sealed class FilaFaturamentoConfiguration
    : IEntityTypeConfiguration<FilaFaturamento>
{
    public void Configure(EntityTypeBuilder<FilaFaturamento> builder)
    {
        builder.HasKey(f => f.Id);

        builder
            .Property(f => f.PedidoId)
            .IsRequired();

        builder
            .Property(f => f.Payload)
            .IsRequired();

        builder
            .Property(f => f.CriadoEm)
            .HasDefaultValueSql("GETUTCDATE()")
            .IsRequired();

        builder
            .Property(f => f.Tentativas)
            .HasDefaultValue(0)
            .IsRequired();
    }
}
