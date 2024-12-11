namespace Ecommerce.Services.Backgrounds;

/// <summary>
/// O FaturamentoServiceClient garante que o HttpClient configurado seja sempre consistente e reutilizável,
/// eliminando problemas de escopo e permitindo que o BackgroundService receba uma dependência totalmente preparada.
/// 
/// Se injetarmos diretamente o HttpClient em um BackgroundService, ele pode ser descartado antes de ser usado,
/// isso acontece porque o BackgroundService é um serviço de escopo singleton e o HttpClient é um serviço de escopo
/// transiente. O FaturamentoServiceClient resolve esse problema.
/// </summary>
/// <param name="httpClient"></param>
public class FaturamentoServiceClient
{
    public HttpClient HttpClient { get; }

    public FaturamentoServiceClient(HttpClient httpClient)
    {
        HttpClient = httpClient;
    }
}
