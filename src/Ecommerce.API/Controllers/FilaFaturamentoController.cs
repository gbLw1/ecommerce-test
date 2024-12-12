using Ecommerce.Infra.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Ecommerce.API.Controllers;

[Route("api/fila-faturamento")]
[ApiController]
public class FilaFaturamentoController(
    EcommerceContext context) : ControllerBase
{
    record FilaFaturamentoItemModel(
        [property: JsonPropertyName("id")] int Id,
        [property: JsonPropertyName("criadoEm")] DateTime CriadoEm,
        [property: JsonPropertyName("pedidoId")] Guid PedidoId,
        [property: JsonPropertyName("payload")] string Payload,
        [property: JsonPropertyName("tentativas")] int Tentativas
        );
    [HttpGet]
    public async Task<IActionResult> ObterFilaFaturamento()
    {
        var filaFaturamento = await context
            .FilaFaturamento
            .Select(fila => new FilaFaturamentoItemModel(
                fila.Id,
                fila.CriadoEm,
                fila.PedidoId,
                fila.Payload,
                fila.Tentativas
            ))
            .ToListAsync();

        return Ok(filaFaturamento);
    }
}
