using FluentValidation;

namespace Ecommerce.Shared.Args;

public sealed class PedidoPostArgs
{
    public Guid Identificador { get; set; }

    public DateTime DataVenda { get; set; }

    public required ClientePostArgs Cliente { get; set; }

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
