using System.Text.Json.Serialization;
using FluentValidation;

namespace Ecommerce.Shared.Args;

public sealed class PedidoItemArgs
{
    [JsonPropertyName("produtoId")]
    public int ProdutoId { get; set; }

    [JsonPropertyName("descricao")]
    public required string Descricao { get; set; }

    [JsonPropertyName("quantidade")]
    public decimal Quantidade { get; set; }

    [JsonPropertyName("precoUnitario")]
    public decimal PrecoUnitario { get; set; }

    public class Validator : AbstractValidator<PedidoItemArgs>
    {
        public Validator()
        {
            RuleFor(x => x.ProdutoId)
                .GreaterThan(0)
                .WithMessage("ProdutoId é obrigatório");

            RuleFor(x => x.Descricao)
                .NotEmpty()
                .WithMessage("Descrição é obrigatória");

            RuleFor(x => x.Quantidade)
                .GreaterThan(0)
                .WithMessage("Quantidade é obrigatória");

            RuleFor(x => x.PrecoUnitario)
                .GreaterThan(0)
                .WithMessage("Preço unitário é obrigatório");
        }
    }
}