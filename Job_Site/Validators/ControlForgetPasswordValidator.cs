using FluentValidation;
using Job_Site.Dtos;

namespace Job_Site.Validators
{
	public class ControlForgetPasswordValidator : AbstractValidator<ControlForgetPassword>
	{
		public ControlForgetPasswordValidator()
		{
			RuleFor(x => x.Mail)
			.EmailAddress().WithMessage("Email düzgün formatda deyil.")
			.When(x => !string.IsNullOrWhiteSpace(x.Mail));

			RuleFor(x => x.Phone)
				.Matches(@"^(?:\+994|0)(50|51|55|70|77|99)\d{7}$")
				.WithMessage("Telefon nömrəsi düzgün formatda deyil. Məsələn: +994501234567 və ya 0501234567")
				.When(x => !string.IsNullOrWhiteSpace(x.Phone));

			RuleFor(x => x)
				.Must(x => !string.IsNullOrWhiteSpace(x.Mail) || !string.IsNullOrWhiteSpace(x.Phone))
				.WithMessage("Zəhmət olmasa email və ya telefon nömrəsi daxil edin.");

		}
	}
}
