using Ecommerce.Shared.Args;
using Ecommerce.Shared.Models;

namespace Ecommerce.Services.Abstractions;

public interface IPedidoService
{
    Task<IReadOnlyCollection<PedidoModel>> ObterVendasAsync();
    Task<PedidoModel?> ObterPedidoAsync(Guid id);
    Task<PedidoModel> ProcessarVendaAsync(PedidoPostArgs args);
    Task<PedidoModel?> AlterarPedidoPendenteAsync(Guid id, PedidoPutArgs args);
}