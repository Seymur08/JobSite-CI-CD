using FluentValidation;
using Job_Site.Dtos;

namespace Job_Site.Validators
{
	public class RequestCategoryValidator : AbstractValidator<RequestCategory>
	{
		public RequestCategoryValidator()
		{
			RuleFor(x => x.Category)
		.NotEmpty().WithMessage("Category boş ola bilməz.")
		.MaximumLength(100).WithMessage("Category ən çox 100 simvol ola bilər.");

			RuleFor(x => x.Section)
				.NotEmpty().WithMessage("Section boş ola bilməz.")
				.MaximumLength(100).WithMessage("Section ən çox 100 simvol ola bilər.");

			RuleFor(x => x.isItNew)
				.NotNull().WithMessage("isItNew dəyəri təyin olunmalıdır.");
		}
	}
}
