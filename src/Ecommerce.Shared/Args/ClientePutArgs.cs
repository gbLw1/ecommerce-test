using Ecommerce.Shared.Enums;
using FluentValidation;

namespace Ecommerce.Shared.Args;

public sealed class ClientePutArgs
{
    public required string Nome { get; set; }

    public required string CPF { get; set; }

    public ClienteCategoria Categoria { get; set; }

    public class Validator : AbstractValidator<ClientePutArgs>
    {
        public Validator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty()
                .WithMessage("Nome é obrigatório");

            RuleFor(x => x.CPF)
                .NotEmpty()
                .WithMessage("CPF é obrigatório")
                .MaximumLength(14)
                .WithMessage("CPF inválido");

            RuleFor(x => x.Categoria)
                .IsInEnum()
                .WithMessage("Categoria inválida");
        }
    }
}