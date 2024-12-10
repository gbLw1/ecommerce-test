using Ecommerce.Infra.Context;
using Ecommerce.Services.Abstractions;
using Ecommerce.Services.Core;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EcommerceContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IPedidoService, PedidoService>();

// Add HttpClient para comunicação com o serviço de faturamento
builder.Services.AddHttpClient<PedidoService>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["FaturamentoAPI:BaseUrl"]
        ?? throw new InvalidOperationException("appSettings section: FaturamentoAPI não configurada."));
    client.DefaultRequestHeaders.Add("email", builder.Configuration["FaturamentoAPI:Email"]);
});

var app = builder.Build();

// Aplicando migrations ao iniciar a aplicação
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<EcommerceContext>();
    if (dbContext.Database.GetPendingMigrations().Any())
    {
        dbContext.Database.Migrate();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
