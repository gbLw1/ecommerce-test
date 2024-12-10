using Ecommerce.Shared.Enums;
using System.Text.Json.Serialization;

namespace Ecommerce.Shared.Models;

public sealed class PedidoModel
{
    [JsonPropertyName("identificador")]
    public Guid Identificador { get; set; }

    [JsonPropertyName("dataVenda")]
    public DateTime DataVenda { get; set; }

    [JsonPropertyName("cliente")]
    public ClienteModel Cliente { get; set; } = default!;

    [JsonPropertyName("itens")]
    public IReadOnlyCollection<PedidoItemModel> Itens { get; set; } = [];

    [JsonPropertyName("subTotal")]
    public decimal SubTotal { get; set; }

    [JsonPropertyName("desconto")]
    public decimal Desconto { get; set; }

    [JsonPropertyName("valorTotal")]
    public decimal Total { get; set; }

    [JsonPropertyName("status")]
    public PedidoStatus Status { get; set; }
}