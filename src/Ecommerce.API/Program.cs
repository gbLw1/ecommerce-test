using Ecommerce.Infra.Context;
using Ecommerce.Services.Abstractions;
using Ecommerce.Services.Backgrounds;
using Ecommerce.Services.Core;
using Microsoft.EntityFrameworkCore;
using Polly;

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

var ExternalServiceAPIBaseURL = builder.Configuration["FaturamentoAPI:BaseUrl"]
    ?? throw new InvalidOperationException("appSettings section: FaturamentoAPI:BaseUrl não configurada.");
var ExternalServiceAPIEmail = builder.Configuration["FaturamentoAPI:Email"]
    ?? throw new InvalidOperationException("appSettings section: FaturamentoAPI:Email não configurado.");

// Add HttpClient para comunicação com o serviço de faturamento
builder.Services.AddHttpClient<IPedidoService, PedidoService>(client =>
{
    client.BaseAddress = new Uri(ExternalServiceAPIBaseURL);
    client.DefaultRequestHeaders.Add("email", ExternalServiceAPIEmail);
})
.AddTransientHttpErrorPolicy(policyBuilder =>
    policyBuilder.WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt))) // backoff exponencial
)
.AddPolicyHandler(Policy.TimeoutAsync<HttpResponseMessage>(TimeSpan.FromSeconds(10))); // Timeout de 10 segundos

// Registra o BackgroundService para fila de retry dos faturamentos que falharam
builder.Services.AddHostedService<FilaFaturamentoProcessor>();

// Add HttpClient para background service
builder.Services.AddHttpClient<FaturamentoServiceClient>(client =>
{
    client.BaseAddress = new Uri(ExternalServiceAPIBaseURL);
    client.DefaultRequestHeaders.Add("email", ExternalServiceAPIEmail);
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Aplicando migrations ao iniciar a aplica��o
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

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
