using System.Text.Json.Serialization;

namespace Ecommerce.Shared.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PedidoStatus
{
    /// <summary>
    /// Pedido foi criado, mas ainda não foi processado ou está na fila para processamento.
    /// </summary>
    PENDENTE,

    /// <summary>
    /// Pedido foi processado com sucesso.
    /// </summary>
    CONCLUIDO,

    /// <summary>
    /// Pedido entrou na fila de faturamento (retry) e mesmo assim não foi processado.
    /// </summary>
    CANCELADO,
}
