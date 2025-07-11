using ASP_.NET_WEP_API_JWT.Auth;
using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ASP_.NET_WEP_API_JWT.Controllers.Auth
{

	[Route("api/[controller]")]
	[ApiController]

	public class AuthController : ControllerBase
	{
		private readonly AuthenticationService _authenticationService;

		private readonly UserManager<User> _userManager;

		private readonly HttpContext _httpContext;

		private readonly AppDbContext _appDbContext;

		public AuthController(AuthenticationService authenticationService, IHttpContextAccessor httpContext, UserManager<User> userManager, AppDbContext appDbContext)
		{
			_authenticationService = authenticationService;
			_userManager = userManager;
			_httpContext = httpContext.HttpContext;
			_appDbContext = appDbContext;
		}


		[HttpPost("RefreshToken")]
		public async Task<ActionResult<AuthTokenDto>> RefreshToken()
		{
			if( Request.Cookies.TryGetValue("RefreshToken", out string refreshToken) )
			{
				var user = await _appDbContext.Users.FirstOrDefaultAsync(i => i.RefreshToken == refreshToken);
				if( user is not null )
				{
					var newtoken = await _authenticationService.GenerateJwtToken(user, 30);// refreshToken 7 gun 10080
					return newtoken;

				}
			}

			return Unauthorized();
		}


		[HttpPost("Login")]
		public async Task<ActionResult<AuthTokenDto>> Login(LoginReguestDto loginReguest)
		{
			var token = await _authenticationService.Authenticate(loginReguest, 30);
			//var refreshToken = _authenticationService.GetCookiesRefreshToken();
			if( token is not null )
			{

				Response.Cookies.Append("RefreshToken", token.RefreshToken, new CookieOptions
				{
					HttpOnly = true,
					Secure = false,  //true for http 
					SameSite = SameSiteMode.Lax,
					Expires = DateTime.Now.AddHours(1)
				});

				return token;
			}

			return BadRequest("Login UnSuccessfully");
			//return BadRequest(new { message = "login: not found" });



		}



		[HttpPost("ControlForgetForUser")]
		public async Task<ActionResult<AuthTokenDto>> ControlForgetForUser(ControlForgetPassword controlForget)
		{
			var user = await _appDbContext.Users.FirstOrDefaultAsync(i => i.Email == controlForget.Mail && i.PhoneNumber == controlForget.Phone);

			if( user is not null )
			{
				return Ok();
			}

			return BadRequest();
		}


		[HttpPost("ChangePasswordUser")]
		public async Task<ActionResult<AuthTokenDto>> ChangePasswordUser(PasswordChangeDto passwordChange)
		{

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			if( usermail == passwordChange.email )
			{
				var user = await _userManager.FindByEmailAsync(usermail!);

				if( user is not null )
				{
					var ischeck = await _userManager.CheckPasswordAsync(user, passwordChange.oldPassword);

					if( ischeck )
					{
						var ok = await _userManager.ChangePasswordAsync(user, passwordChange.oldPassword, passwordChange.newPassword);

						if( ok.Succeeded )
							return Ok();
					}

				}
			}


			return BadRequest();

			
		}


		[HttpPost("check")]
		public async Task<ActionResult<AuthTokenDto>> ForgetPasswordChange(string password)
		{

			/////////
			return BadRequest("Login UnSuccessfully");
		}

	}
}
