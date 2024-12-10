using Ecommerce.Infra.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Infra.Context;

public class EcommerceContext(DbContextOptions<EcommerceContext> options) : DbContext(options)
{
    public DbSet<Pedido> Pedidos { get; set; } = default!;
    public DbSet<PedidoItem> PedidoItens { get; set; } = default!;
    public DbSet<Cliente> Clientes { get; set; } = default!;

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        base.OnConfiguring(builder);

        builder.EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(assembly: GetType().Assembly);
    }
}
