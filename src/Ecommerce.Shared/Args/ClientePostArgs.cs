using System.Text.Json.Serialization;
using Ecommerce.Shared.Enums;
using FluentValidation;

namespace Ecommerce.Shared.Args;

public sealed class ClientePostArgs
{
    [JsonPropertyName("clienteId")]
    public Guid ClienteId { get; set; }

    [JsonPropertyName("nome")]
    public required string Nome { get; set; }

    [JsonPropertyName("cpf")]
    public required string CPF { get; set; }

    [JsonPropertyName("categoria")]
    public ClienteCategoria Categoria { get; set; }

    public class Validator : AbstractValidator<ClientePostArgs>
    {
        public Validator()
        {
            RuleFor(x => x.ClienteId)
                .NotEmpty()
                .WithMessage("ClienteId é obrigatório");

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