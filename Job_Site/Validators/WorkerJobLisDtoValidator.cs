using FluentValidation;
using Job_Site.Dtos;

namespace Job_Site.Validators
{
	public class WorkerJobLisDtoValidator : AbstractValidator<WorkerJobLisDto>
	{
		public WorkerJobLisDtoValidator()
		{

			RuleFor(x => x.Adress)
						.NotEmpty().WithMessage("Ünvan boş ola bilməz.")
						.MaximumLength(200).WithMessage("Ünvan maksimum 200 simvol ola bilər.");

			RuleFor(x => x.WorkExperience)
				.MaximumLength(200).WithMessage("İş təcrübəsi maksimum 200 simvol ola bilər.");

			RuleFor(x => x.Education)
				.MaximumLength(200).WithMessage("Təhsil məlumatı maksimum 200 simvol ola bilər.");

			RuleFor(x => x.Salary).NotEmpty().WithMessage("Maaş məlumatı bos ola bilmaz");

			RuleFor(x => x.Age)
				.Matches(@"^\d{1,2}$").WithMessage("Yaş rəqəmlə göstərilməlidir və maksimum 2 rəqəm olmalıdır.");

			RuleFor(x => x.Phone)
				.NotEmpty().WithMessage("Telefon nömrəsi boş ola bilməz.")
				.Matches(@"^\+?\d{10,15}$").WithMessage("Telefon nömrəsi düzgün formatda deyil.");

			RuleFor(x => x.Email)
				.EmailAddress().WithMessage("Email düzgün formatda deyil.");

			RuleFor(x => x.Gender)
				.Must(g => g == "Kişi" || g == "Qadın" || string.IsNullOrWhiteSpace(g))
				.WithMessage("Gender yalnız 'Kişi' və ya 'Qadın' ola bilər.");

			RuleFor(x => x.Detailed)
				.MaximumLength(1000).WithMessage("Ətraflı məlumat maksimum 1000 simvol ola bilər.");

		}
	}
}
