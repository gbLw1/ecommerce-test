using Ecommerce.Infra.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce.Infra.Configurations;

internal sealed class ClienteConfiguration
    : IEntityTypeConfiguration<Cliente>
{
    public void Configure(EntityTypeBuilder<Cliente> builder)
    {
        builder.HasKey(c => c.Id);

        builder
            .Property(c => c.Nome)
            .IsRequired()
            .HasMaxLength(200);

        builder
            .Property(c => c.CPF)
            .HasMaxLength(14) // 999.999.999-99
            .IsRequired();

        builder
            .Property(c => c.Categoria)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();
    }
}
