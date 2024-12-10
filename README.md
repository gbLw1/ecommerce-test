# Desafio Técnico - E-commerce

## Fase 1

Desenvolva um endpoint, utilizando .NET (5, 6 ou 8), para o processamento
de vendas, seguindo o JSON no Anexo 1, aplique as regras de desconto, de acordo
com a categoria do cliente, e salve-o em um banco de dados (SQL Server, SQLite
ou In-memory).

Regra de desconto:

1. Cliente regular: 5% de desconto se o valor total da venda for maior que R$
   500,00.
2. Cliente premium: 10% de desconto se o valor total da venda for maior que
   R$ 300,00.
3. Cliente VIP: 15% de desconto para qualquer valor de venda.

As categorias existes hoje são **REGULAR**, **PREMIUM** e **VIP**. Porém, tenha em
mente que poderão existir mais categorias no futuro.

Para essa fase, é interessante que seja feito uso de um ORM (EF core,
preferencialmente).
Faça uso de alguma arquitetura em camada.

_Utilize o tipo de dado “decimal” para os campos de valores; trabalhe com
apenas 2 casas decimais, com arredondamento padrão do .NET;_

Por fim, será considerado um diferencial se criar endpoints para obter um
pedido cadastrado, listar e alterar pedidos (caso ele já não esteja finalizado).

### Anexo 1 – JSON para recebimento das vendas

_Este é o JSON que seu endpoint deverá processar. Você trocar essas informações
como quiser, mas é importante que mantenha o formato do JSON._

```json
{
  "identificador": "FDD5099A-001C-497A-BE28-13AF0FB36505",
  "dataVenda": "2024-09-05T14:40:00Z",
  "cliente": {
    "clienteId": "104B4852-228E-4DBA-AE12-345CDE66EA25",
    "nome": "João",
    "cpf": "111.222.333-44",
    "categoria": "PREMIUM"
  },
  "itens": [
    {
      "produtoId": 87,
      "descricao": "Camisa Polo Preta M",
      "quantidade": 2.0,
      "precoUnitario": 149.99
    },
    {
      "produtoId": 25,
      "descricao": "Calça Jeans 42",
      "quantidade": 1.0,
      "precoUnitario": 89.9
    }
  ]
}
```

## Fase 2

Após gravar o pedido, já com os descontos, no banco de dados, é necessário
enviar um sumário dele para um serviço externo que realizará o faturamento da
venda.

O JSON exemplo da requisição que deverá ser enviada está no Anexo 2. O
serviço de faturamento realizará a validação de algumas informações.

Regra de validação:

1. A soma dos itens deverá ser igual ao subtotal da venda;
2. A soma dos itens, debitado o valor do desconto, deverá ser igual ao valor
   total da venda.

Após receber uma resposta positiva do serviço de faturamento, o status do
pedido deverá ser alterado para CONCLUIDO.

Considere que o serviço de faturamento não estará 100% do tempo
disponível e que seu tempo de resposta pode variar indefinidamente. Essa
informação DEVE ser levada em consideração para a criação da estrutura de
integração entre os serviços, via REST.

### ANEXO 2 – Comunicação com o serviço de faturamento

Parâmetros para envio da requisição:

Documentação: `https://sti3-faturamento.azurewebsites.net/swagger`

Url: `https://sti3-faturamento.azurewebsites.net/api/vendas`

Método: POST

Cabeçalhos:

- email: {seu e-mail}

Corpo:

```json
{
  "identificador": "FDD5099A-001C-497A-BE28-13AF0FB36505",
  "subTotal": 389.88,
  "descontos": 38.98,
  "valorTotal": 350.9,
  "itens": [
    {
      "quantidade": 2.0,
      "precoUnitario": 149.99
    },
    {
      "quantidade": 1.0,
      "precoUnitario": 89.9
    }
  ]
}
```
