using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Dtos;
using Job_Site.Dtos.Password;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Job_Site.Services.Interfaces
{
	public interface IPasswordServices
	{
		public Task<bool> ChangePassword(PasswordChangeDto passwordChange);
		public Task<bool> ConFirmCode(string code);
		public Task<bool> GeneratorCode();
		public Task<string> ForgetPassword(ControlUser controlUser);

		public Task<bool> ForgetChangePassword( NewPassword newPassword);
	}
}
