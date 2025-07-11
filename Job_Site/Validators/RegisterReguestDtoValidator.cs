using FluentValidation;
using Job_Site.Dtos;

namespace Job_Site.Validators
{
	public class RegisterReguestDtoValidator : AbstractValidator<RegisterReguestDto>
	{
		public RegisterReguestDtoValidator()
		{

			RuleFor(x => x.UserName)
							.NotEmpty().WithMessage("İstifadəçi adı boş ola bilməz")
							.MinimumLength(2).WithMessage("İstifadəçi adı ən az 2 simvol olmalıdır");

			RuleFor(x => x.SurName)
				.NotEmpty().WithMessage("Soyad boş ola bilməz");

			RuleFor(x => x.Email)
				.NotEmpty().WithMessage("Email boş ola bilməz")
				.EmailAddress().WithMessage("Düzgün email formatı daxil edin");

			RuleFor(x => x.Password)
				.NotEmpty().WithMessage("Şifrə boş ola bilməz")
				.MinimumLength(6).WithMessage("Şifrə ən az 6 simvol olmalıdır")
				.Matches("[A-Z]").WithMessage("Şifrə ən az bir böyük hərf (A-Z) içerməlidir")
				.Matches("[a-z]").WithMessage("Şifrə ən az bir kiçik hərf (a-z) içerməlidir")
				.Matches("[0-9]").WithMessage("Şifrə ən az bir rəqəm (0-9) içerməlidir")
				.Matches("[^a-zA-Z0-9]").WithMessage("Şifrə ən az bir xüsusi simvol içerməlidir");

			RuleFor(x => x.Gender)
				.NotEmpty().WithMessage("Cinsiyyət boş ola bilməz")
				.Must(g => g == "Kişi" || g == "Qadın").WithMessage("Cinsiyyət yalnız 'Kişi' və ya 'Qadın' ola bilər");

			RuleFor(x => x.Age)
				.NotEmpty().WithMessage("Yaş boş ola bilməz")
				.Must(age => int.TryParse(age, out var parsedAge) && parsedAge >= 18 && parsedAge <= 85)
				.WithMessage("Yaş düzgün aralıqda olmalıdır (0-85)");

			RuleFor(x => x.Phone)
				.NotEmpty().WithMessage("Telefon nömrəsi boş ola bilməz")
				.Matches(@"^\+?\d{10,15}$").WithMessage("Telefon nömrəsi düzgün formatda deyil");

			RuleFor(x => x.Role)
				.NotEmpty().WithMessage("Rol boş ola bilməz");

		}
	}
}
