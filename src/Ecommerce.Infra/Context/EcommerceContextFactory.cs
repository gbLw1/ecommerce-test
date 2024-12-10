using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.Text;

namespace Ecommerce.Infra.Context;

internal class EcommerceContextFactory : IDesignTimeDbContextFactory<EcommerceContext>
{
    public EcommerceContext CreateDbContext(string[] args)
    {
        StringBuilder connectionString = new();

        connectionString.Append("Server=(localdb)\\mssqllocaldb;");
        connectionString.Append("Initial Catalog=desafio-sti3;");
        connectionString.Append("Trusted_Connection=True;");
        connectionString.Append("Trust Server Certificate=True;");

        var optionsBuilder = new DbContextOptionsBuilder<EcommerceContext>();
        optionsBuilder.UseSqlServer(connectionString.ToString());

        return new EcommerceContext(optionsBuilder.Options);
    }
}