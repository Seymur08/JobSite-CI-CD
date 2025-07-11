using FluentValidation;
using Job_Site.Dtos;

namespace Job_Site.Validators
{
	public class EmployerJobListDtoValidator : AbstractValidator<EmployerJobListDto>
	{
		public EmployerJobListDtoValidator()
		{
			RuleFor(x => x.Category)
	.NotEmpty().WithMessage("Kateqoriya boş ola bilməz.");

			RuleFor(x => x.Phone)
				.NotEmpty().WithMessage("Telefon nömrəsi boş ola bilməz.")
				.MaximumLength(15);

			RuleFor(x => x.Email)
				.EmailAddress().WithMessage("Email düzgün formatda deyil.")
				.When(x => !string.IsNullOrWhiteSpace(x.Email));

			RuleFor(x => x.Company)
				.NotEmpty().WithMessage("Şirkət adı boş ola bilməz.")
				.MaximumLength(100);

			RuleFor(x => x.Work_experience)
				.MaximumLength(100);

			RuleFor(x => x.Contact_person)
				.MaximumLength(100);

			RuleFor(x => x.Work_time)
				.MaximumLength(100);

			RuleFor(x => x.Work_schedule)
				.MaximumLength(100);

			RuleFor(x => x.Requirements)
				.MaximumLength(1000);

			RuleFor(x => x.Address)
				.MaximumLength(200);

			RuleFor(x => x.Salary_Min).NotEmpty().WithMessage(" Min Maaas məlumatı bos ola bilmaz");


			RuleFor(x => x.Salary_Max).NotEmpty().WithMessage("Max Maas məlumatı bos ola bilmaz");


			RuleFor(x => x.Age_Min).NotEmpty().WithMessage(" Min Yas məlumatı bos ola bilmaz");


			RuleFor(x => x.Age_Max).NotEmpty().WithMessage("Max Yas məlumatı bos ola bilmaz");


		}
	}
}
