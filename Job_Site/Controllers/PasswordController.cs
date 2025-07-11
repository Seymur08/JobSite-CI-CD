using Job_Site.Dtos;
using Job_Site.Dtos.Password;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Job_Site.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class PasswordController : ControllerBase
	{
		private readonly IPasswordServices _passwordServices;

		public PasswordController(IPasswordServices passwordServices)
		{
			_passwordServices = passwordServices;
		}


		[HttpPost("ChangePassword")]
		public async Task<ActionResult> ChangePassword([FromBody] PasswordChangeDto passwordChange)
		{
			var isOk = await _passwordServices.ChangePassword(passwordChange);

			if( isOk )
				return Ok(true);
			return BadRequest("Password not working");

		}


		[HttpPost("ConFirmCode")]
		public async Task<ActionResult> ConFirmCode([FromBody] string code)
		{
			var isok = await _passwordServices.ConFirmCode(code);
			if( isok )
				return Ok(isok);
			return BadRequest("Category not working");

		}

		[AllowAnonymous]
		[HttpPost("ForgetPassword")]
		public async Task<ActionResult> ForgetPassword([FromBody] ControlUser controlUser)
		{
			var tk = await _passwordServices.ForgetPassword(controlUser);

			if( tk is not null )
				return Ok(tk);
			return BadRequest("User not found");

		}

		
		[HttpPost("ForgetChangePassword")]
		public async Task<ActionResult> ForgetChangePassword([FromBody] NewPassword newPassword)
		{
			Console.WriteLine("Oley");
			Console.WriteLine("Oley");
			Console.WriteLine("Oley");
			Console.WriteLine("Oley");
			Console.WriteLine("Oley");
			Console.WriteLine("Oley");
			var isok = await _passwordServices.ForgetChangePassword(newPassword);

			if( isok )
				return Ok("Ok");
			return BadRequest("Password is not change");

		}

		[HttpGet("GeneratorCode")]
		public async Task<ActionResult> GeneratorCode()
		{
			var ok = await _passwordServices.GeneratorCode();
			if( ok )
				return Ok();
			return BadRequest("code request not working");
		}
	}
}
