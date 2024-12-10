export enum ClienteCategoria {
  /// <summary>
  /// Cliente regular: 5% de desconto se o valor total da venda for maior que R$ 500,00.
  /// </summary>
  REGULAR = "REGULAR",

  /// <summary>
  /// Cliente premium: 10% de desconto se o valor total da venda for maior que R$ 300,00.
  /// </summary>
  PREMIUM = "PREMIUM",

  /// <summary>
  /// Cliente VIP: 15% de desconto para qualquer valor de venda.
  /// </summary>
  VIP = "VIP",
}
