﻿using FluentValidation;
using Job_Site.Dtos;

namespace Job_Site.Validators
{
	public class LoginReguestDtoValidator : AbstractValidator<LoginReguestDto>
	{
		public LoginReguestDtoValidator()
		{
			RuleFor(x => x.Email)
		  .NotEmpty().WithMessage("Email boş ola bilməz.")
		  .EmailAddress().WithMessage("Email düzgün formatda deyil.");

			RuleFor(x => x.Password)
				.NotEmpty().WithMessage("Şifrə boş ola bilməz.")
				.MinimumLength(6).WithMessage("Şifrə ən az 6 simvol olmalıdır.")
				.MaximumLength(100).WithMessage("Şifrə maksimum 100 simvol ola bilər.");

		}
	}
}
