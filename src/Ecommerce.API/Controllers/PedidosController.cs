using Ecommerce.Services.Abstractions;
using Ecommerce.Shared.Args;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PedidosController(
    IPedidoService vendaService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ObterPedidos()
    {
        var vendas = await vendaService.ObterVendasAsync();
        return Ok(vendas);
    }

    [HttpGet("{pedidoId}")]
    public async Task<IActionResult> ObterVenda(Guid pedidoId)
    {
        var venda = await vendaService.ObterPedidoAsync(pedidoId);
        if (venda == null) return NotFound();

        return Ok(venda);
    }

    [HttpPost]
    public async Task<IActionResult> ProcessarVenda([FromBody] PedidoPostArgs args)
    {
        try
        {
            var venda = await vendaService.ProcessarVendaAsync(args);

            return CreatedAtAction(
                actionName: nameof(ObterVenda),
                routeValues: new { pedidoId = venda.Identificador },
                value: venda);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{pedidoId}")]
    public async Task<IActionResult> AlterarPedidoPendente([FromRoute] Guid pedidoId,
                                                           [FromBody] PedidoPutArgs args)
    {
        var venda = await vendaService.AlterarPedidoPendenteAsync(pedidoId, args);

        if (venda is null)
        {
            return BadRequest("Venda não encontrada ou já processada.");
        }

        return Ok(venda);
    }
}
