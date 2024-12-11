using System.Text.Json.Serialization;
using FluentValidation;

namespace Ecommerce.Shared.Args;

public sealed class PedidoPutArgs
{
    [JsonPropertyName("dataVenda")]
    public DateTime DataVenda { get; set; }

    [JsonPropertyName("cliente")]
    public required ClientePutArgs Cliente { get; set; }

    [JsonPropertyName("itens")]
    public IReadOnlyCollection<PedidoItemArgs> Itens { get; set; } = [];

    public class Validator : AbstractValidator<PedidoPutArgs>
    {
        public Validator()
        {
            RuleFor(x => x.DataVenda)
                .NotEmpty()
                .WithMessage("Data da venda é obrigatória");

            RuleFor(x => x.Cliente)
                .NotNull()
                .WithMessage("Cliente é obrigatório");

            RuleFor(x => x.Itens)
                .NotEmpty()
                .WithMessage("Itens do pedido são obrigatórios");
        }
    }
}
