# Desafio Técnico - E-commerce

## Objetivo

Você foi contratado(a) por uma plataforma de e-commerce para desenvolver
uma API responsável pelo processamento dos pedidos do site. A API deverá receber
uma requisição para gravar uma venda, seguindo o modelo de JSON no Anexo 1.
Após o recebimento, deve ser aplicado as regras de desconto, de acordo com a
categoria do cliente, e salvá-lo no banco de dados. Por fim, após salvar o pedido no
banco de dados, deverá ser realizado uma requisição HTTP para um serviço externo,
responsável por realizar o faturamento desse pedido

### Fase 1

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

### Fase 2

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

---

## Setup

1. Clone o repositório
2. Abra o projeto no Visual Studio
3. Altere a string de conexão nos arquivos [`appsettings.Development.json`](./src/Ecommerce.API/appsettings.Development.json) e [`EcommerceContextFactory.cs`](./src/Ecommerce.Infra/Context/EcommerceContextFactory.cs) para a sua
   instância do SQL Server
4. Altere o email na section `FaturamentoAPI` no arquivo [`appsettings.Development.json`](./src/Ecommerce.API/appsettings.Development.json) para o seu email

### Rodando a API

para rodar a API, basta executar o projeto `Ecommerce.API` no Visual Studio

_Ao executar o projeto `Ecommerce.API` as migrations serão aplicadas automaticamente_

```bash
cd src/Ecommerce.API
dotnet run
```

A documentação da API estará disponível em `https://localhost:7061/swagger/index.html`

### Rodando o Frontend

para rodar o frontend, basta instalar as dependências e executar o projeto React `Ecommerce.Web`

```bash
cd src/Ecommerce.Web
npm i
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## Frontend (opcional)

O projeto é um dashboard desenvolvido para facilitar a interação com a API e testar as funcionalidades do backend, conta com técnicas modernas de desenvolvimento, como a utilização de TypeScript, Vite e TailwindCSS.

Também inclui boas práticas de desenvolvimento como a utilização de componentes reutilizáveis, gerenciamento de estado global com `Zustand`, roteamento com `React Router`, gestão de formulários com `React Hook Form` e gerenciamento de requisições com `Axios` incluindo tratamento de erros e feedbacks visuais.

Foi pensado no UI/UX para facilitar a interação do usuário com a aplicação, com um design limpo e intuitivo, além de ser responsivo e conter componentes customizados como modal, toast e tooltip para melhorar a experiência do usuário.

### Páginas implementadas

- Listagem de pedidos
- Faturamento de pedidos
- Visualização de detalhes de um pedido
- Alteração de pedidos
- Listagem da fila de falhas e reprocessamento de pedidos

### Melhorias consideradas para o frontend

- Implementação de `React Query` para cache e refetch de dados
- Implementação de internacionalização com `i18next`
- Implementação de paginação, filtros de busca e ordenação
- Implementação de loading com animações/transições e skeleton screens
- Implementação de validações client-side de formulários (Yup ou Zod)

---

## Backend

O backend foi desenvolvido utilizando .NET 8 e Entity Framework Core
como ORM, com uma arquitetura em camadas que facilita a manutenção e escalabilidade do projeto.

Para o banco de dados foi utilizado o SQL Server, com migrations para versionamento do banco de dados e configuração do `DbContextFactory` para aplicar as migrations automaticamente ao executar o projeto.

Para a comunicação e integração com o serviço externo de faturamento foi utilizado o `HttpClient` com `Polly` para retries e timeout controlado, além de uma fila de falhas que garante o reprocessamento de pedidos através de um background service.

A documentação da API foi disponibilizada com Swagger, facilitando o entendimento e teste das rotas disponíveis.

### Arquitetura

Para a escolha da arquitetura, optei por uma divisão em 4 camadas que suprisse o objetivo do projeto e que também fosse escalável para futuras implementações:

- **API**: Camada responsável por receber as requisições HTTP e direcionar para a camada services
- **Services**: Camada responsável por orquestrar as regras de negócio e realizar a comunicação com o banco de dados
- **Infra**: Camada responsável por armazenar as entidades, mapeamento das tabelas, configurações do EF Core e migrations
- **Shared**: Camada responsável por armazenar as DTOs e Enums compartilhados entre as camadas

### Funcionalidades

- [x] Processamento de vendas salvando no banco de dados SQL Server
- [x] Aplicação de descontos de acordo com a categoria do cliente
- [x] Listagem de pedidos
- [x] Obtenção de um pedido cadastrado
- [x] Alteração de pedidos
- [x] Integração com serviço externo de faturamento
- [x] Retries com Polly reduzindo falhas devido instabilidade temporária
- [x] Timeout controlado evitando travamentos em respostas indefinidas
- [x] Fila para reprocessamento de pedidos que falharam no processo de faturamento, garante que pedidos sejam faturados mesmo se o serviço estiver fora do ar por um longo período
- [x] Background service para automatização do agendamento e reprocessamento de pedidos da fila de falhas

  Para testar a fila de falhas, basta descomentar o throw no método `EnviarParaFaturamento` na linha 102 do arquivo [`PedidoService.cs`](./src/Ecommerce.Services/Core/PedidoService.cs)

  ```csharp
  throw new HttpRequestException("Simulando erro no serviço de faturamento.");
  ```

  A partir disso, todo pedido cadastrado será enviado para a fila de falhas e reprocessado automaticamente a cada 30 segundos, respeitando o limite de tentativas e o tempo de espera configurados.

- [x] Logs de falhas com `ILogger` para monitoramento e análise de erros
- [x] Documentação da API com Swagger

### Melhorias para o backend

- Implementação de testes unitários e de integração
- Implementação de paginação, filtros de busca e ordenação
- Implementação de versionamento de API para garantir compatibilidade
- Implementação de Docker para facilitar o deploy e escalabilidade da aplicação
- Implementação de CI/CD para automação de testes e deploy
- Considerar a implementação de um serviço de mensageria (RabbitMQ, Kafka) para garantir a entrega de pedidos mesmo em caso de falhas no serviço de faturamento, pois a fila de falhas com banco de dados não é a melhor solução para alta disponibilidade e performance em longo prazo
- Considerar a implementação de Kubernetes para orquestração de containers e escalabilidade da aplicação em caso de microserviços
