using System.Text.Json.Serialization;

namespace Ecommerce.Shared.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PedidoStatus
{
    PENDENTE,
    CONCLUIDO,
}
