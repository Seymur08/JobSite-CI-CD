using FluentValidation;
using Job_Site.Dtos;

namespace Job_Site.Validators
{
	public class PasswordChangeDtoValidator :AbstractValidator<PasswordChangeDto>
	{
		public PasswordChangeDtoValidator()
		{
			RuleFor(x => x.email)
		   .NotEmpty().WithMessage("Email boş ola bilməz.")
		   .EmailAddress().WithMessage("Email düzgün formatda deyil.");

			RuleFor(x => x.oldPassword)
				.NotEmpty().WithMessage("Şifrə boş ola bilməz")
				.MinimumLength(6).WithMessage("Şifrə ən az 6 simvol olmalıdır")
				.Matches("[A-Z]").WithMessage("Şifrə ən az bir böyük hərf (A-Z) içerməlidir")
				.Matches("[a-z]").WithMessage("Şifrə ən az bir kiçik hərf (a-z) içerməlidir")
				.Matches("[0-9]").WithMessage("Şifrə ən az bir rəqəm (0-9) içerməlidir")
				.Matches("[^a-zA-Z0-9]").WithMessage("Şifrə ən az bir xüsusi simvol içerməlidir");

			RuleFor(x => x.newPassword)
				.NotEmpty().WithMessage("Şifrə boş ola bilməz")
				.MinimumLength(6).WithMessage("Şifrə ən az 6 simvol olmalıdır")
				.Matches("[A-Z]").WithMessage("Şifrə ən az bir böyük hərf (A-Z) içerməlidir")
				.Matches("[a-z]").WithMessage("Şifrə ən az bir kiçik hərf (a-z) içerməlidir")
				.Matches("[0-9]").WithMessage("Şifrə ən az bir rəqəm (0-9) içerməlidir")
				.Matches("[^a-zA-Z0-9]").WithMessage("Şifrə ən az bir xüsusi simvol içerməlidir");

			RuleFor(x => x)
				.Must(x => x.oldPassword != x.newPassword)
				.WithMessage("Yeni şifrə köhnə şifrə ilə eyni ola bilməz.");
		}
	}
}
