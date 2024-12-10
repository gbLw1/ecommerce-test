using System.Text.Json.Serialization;

namespace Ecommerce.Shared.Enums;

/// <summary>
/// Categorias facilmente escaláveis com ENUMS conforme a necessidade,
/// podendo ser migrada para uma tabela no banco de dados se necessário.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ClienteCategoria
{
    /// <summary>
    /// Cliente regular: 5% de desconto se o valor total da venda for maior que R$ 500,00.
    /// </summary>
    REGULAR,

    /// <summary>
    /// Cliente premium: 10% de desconto se o valor total da venda for maior que R$ 300,00.
    /// </summary>
    PREMIUM,

    /// <summary>
    /// Cliente VIP: 15% de desconto para qualquer valor de venda.
    /// </summary>
    VIP,
}
