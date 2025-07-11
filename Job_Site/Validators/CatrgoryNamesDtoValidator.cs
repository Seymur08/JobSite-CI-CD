using FluentValidation;
using Job_Site.Dtos;
using Job_Site.Models.Categorys;

namespace Job_Site.Validators
{

	public class WorkerCategoryValidator : AbstractValidator<WorkerCategory>
	{
		
		public WorkerCategoryValidator()
		{
			RuleFor(x => x.Count)
			.GreaterThanOrEqualTo(0)
			.WithMessage("Say sıfırdan az ola bilməz.");

			RuleFor(x => x.Category)
				.NotEmpty()
				.WithMessage("Kateqoriya adı boş ola bilməz.");

			RuleFor(x => x.Section)
				.NotNull()
				.WithMessage("Alt kateqoriyalar siyahısı null ola bilməz.")
				.Must(list => list.Count > 0)
				.WithMessage("Ən azı bir alt kateqoriya olmalıdır.");

			//RuleForEach(x => x.SubCategoriesDto)
			//	.SetValidator(new SubCategoryNamesDtoValidator());
		}
	}
}
