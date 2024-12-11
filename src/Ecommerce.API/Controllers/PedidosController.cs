using Ecommerce.Services.Abstractions;
using Ecommerce.Shared.Args;
using Ecommerce.Shared.Enums;
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

    // Get By ID com status na query pode não ser a melhor opção
    // mas foi uma solução para obter o pedido pendente quando
    // acessado a tela ~/pedidos/{pedidoId} no frontend e
    // retornar 400 para pedidos não encontrados ou != pendentes
    // e ainda manter a rota de consulta de pedidos por ID para
    // consultas externas a parte (ex: swagger).
    [HttpGet("{pedidoId}")]
    public async Task<IActionResult> ObterVenda([FromRoute] Guid pedidoId,
                                                [FromQuery] PedidoStatus? status = null)
    {
        var venda = await vendaService.ObterPedidoAsync(pedidoId, status);

        if (venda is null)
        {
            return BadRequest(
                status is null ? 
                "Pedido não encontrado."
                : "Pedido não encontrado ou já processado.");
        }

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
