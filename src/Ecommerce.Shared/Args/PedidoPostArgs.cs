using System.Text.Json.Serialization;
using FluentValidation;

namespace Ecommerce.Shared.Args;

public sealed class PedidoPostArgs
{
    [JsonPropertyName("identificador")]
    public Guid Identificador { get; set; }

    [JsonPropertyName("dataVenda")]
    public DateTime DataVenda { get; set; }

    [JsonPropertyName("cliente")]
    public required ClientePostArgs Cliente { get; set; }

    [JsonPropertyName("itens")]
    public IReadOnlyCollection<PedidoItemArgs> Itens { get; set; } = [];

    public class Validator : AbstractValidator<PedidoPostArgs>
    {
        public Validator()
        {
            RuleFor(x => x.Identificador)
                .NotEmpty()
                .WithMessage("Identificador é obrigatório");

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
