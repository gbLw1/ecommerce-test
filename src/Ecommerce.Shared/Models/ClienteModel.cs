using Ecommerce.Shared.Enums;
using System.Text.Json.Serialization;

namespace Ecommerce.Shared.Models;

public sealed class ClienteModel
{
    [JsonPropertyName("clienteId")]
    public Guid ClienteId { get; set; }

    [JsonPropertyName("nome")]
    public string Nome { get; set; }

    [JsonPropertyName("cpf")]
    public string CPF { get; set; }

    [JsonPropertyName("categoria")]
    public ClienteCategoria Categoria { get; set; }
}
