using System.Text.Json.Serialization;

namespace Ecommerce.Shared.Args;

public sealed class SumarioFaturamentoPostArgs
{
    [JsonPropertyName("identificador")]
    public Guid Identificador { get; set; }

    [JsonPropertyName("subTotal")]
    public decimal SubTotal { get; set; }

    [JsonPropertyName("descontos")]
    public decimal Descontos { get; set; }

    [JsonPropertyName("valorTotal")]
    public decimal ValorTotal { get; set; }

    [JsonPropertyName("itens")]
    public IReadOnlyCollection<SumarioFaturamentoItemPostArgs> Itens { get; set; }
}

public sealed class SumarioFaturamentoItemPostArgs
{
    [JsonPropertyName("quantidade")]
    public decimal Quantidade { get; set; }

    [JsonPropertyName("precoUnitario")]
    public decimal PrecoUnitario { get; set; }
}

/*
{
    "identificador": "FDD5099A-001C-497A-BE28-13AF0FB36505",
    "subTotal": 389.88,
    "descontos": 39.88,
    "valorTotal": 350.00,
    "itens": [
        {
            "quantidade": 2.0,
            "precoUnitario": 149.99
        },
        {
            "quantidade": 1.0,
            "precoUnitario": 89.90
        }
    ]
}
*/