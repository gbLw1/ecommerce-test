using System.Text.Json.Serialization;

namespace Ecommerce.Shared.Models;

public sealed class PedidoItemModel
{
    [JsonPropertyName("produtoId")]
    public int ProdutoId { get; set; }

    [JsonPropertyName("descricao")]
    public string Descricao { get; set; }

    [JsonPropertyName("quantidade")]
    public decimal Quantidade { get; set; }

    [JsonPropertyName("precoUnitario")]
    public decimal PrecoUnitario { get; set; }
}