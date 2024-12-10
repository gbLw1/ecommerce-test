export enum PedidoStatus {
  /// <summary>
  /// Pedido foi criado, mas ainda não foi processado ou está na fila para processamento.
  /// </summary>
  PENDENTE = "PENDENTE",

  /// <summary>
  /// Pedido foi processado com sucesso.
  /// </summary>
  CONCLUIDO = "CONCLUIDO",

  /// <summary>
  /// Pedido entrou na fila de faturamento (retry) e mesmo assim não foi processado.
  /// </summary>
  CANCELADO = "CANCELADO",
}
