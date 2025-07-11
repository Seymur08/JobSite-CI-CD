using ASP_.NET_WEP_API_JWT.Auth;
using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Dtos.Password;
using Job_Site.Models;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Job_Site.Services
{
	public class PasswordService : IPasswordServices
	{

		private readonly AppDbContext _appDbContext;

		private readonly UserManager<User> _userManager;

		private readonly HttpContext _httpContext;

		private readonly AuthenticationService _authenticationService;

		private readonly IConfiguration _config;

		public PasswordService(AppDbContext appDbContext, IConfiguration config, UserManager<User> userManager, IHttpContextAccessor httpContext, AuthenticationService authenticationService)
		{
			_appDbContext = appDbContext;
			_userManager = userManager;
			_httpContext = httpContext.HttpContext;
			_authenticationService = authenticationService;
			_config = config;	

		}

		public async Task<bool> ChangePassword(PasswordChangeDto passwordChange)
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
							return true;
					}

				}
			}


			return false;


		}

		public async Task<bool> ConFirmCode(string code)
		{

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			if( !string.IsNullOrEmpty(usermail) )
			{
				var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == usermail);

				if( user is not null )
				{

					if( user.VerificationCode == code )
						return true;
				}

			}
			return false;
		}

		public async Task<bool> GeneratorCode()
		{

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			if( !string.IsNullOrEmpty(usermail) )
			{
				var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == usermail);

				if( user is not null )
				{
					var createcode = CreateCode();
					user.VerificationCode = createcode.ToString();
					Network.Send_Message(usermail, createcode);
					await _appDbContext.SaveChangesAsync();
					return true;

				}

			}
			return false;
		}

		public int CreateCode()
		{
			Random random = new Random();
			int number = random.Next(100000, 1000000); // 100000 - 999999 arası
													   //Console.WriteLine(number);
			return number;
		}


		//  burda istifadeci tapib ona token verilir ve testiq kodu gonderilir
		public async Task<string> ForgetPassword(ControlUser controlUser)  
		{
			var user = await _appDbContext.Users.
				FirstOrDefaultAsync(i => i.Email == controlUser.Email && i.PhoneNumber == controlUser.Phone);
			if( user is not null )
			{
				var createcode = CreateCode();
				user.VerificationCode = createcode.ToString();
				Network.Send_Message(user.Email, createcode);
				await _appDbContext.SaveChangesAsync();
				return GenerateJwtToken(user, 5);
				//return true;

			}

			//if( user is not null )
			//{
			//	// return GenerateJwtToken(user, 5); 
			//}
			return null;

		}

		public async Task<bool> ForgetChangePassword(NewPassword newPassword)
		{

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			if( !string.IsNullOrEmpty(usermail) )
			{
				var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == usermail);

				if( user is not null && newPassword is not null )
				{

					if( newPassword.newPassword == newPassword.againPassword )
					{
						await _userManager.RemovePasswordAsync(user);
						var ok = await _userManager.AddPasswordAsync(user, newPassword.newPassword);
						// var ok = await _userManager.ChangePasswordAsync(user, user.PasswordHash, newPassword.newPassword);

						if( ok.Succeeded )
							return true;
					}
				}

			}

			return false;

		}


		public string GenerateJwtToken(User user, int time)
		{
			var jwtSettings = _config.GetSection("Jwt");
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings ["Key"]!));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var claims = new []
			{

				//new Claim (ClaimsIdentity.DefaultNameClaimType, user.Email!),
				new Claim (ClaimsIdentity.DefaultNameClaimType, user.UserName!),
				new Claim(ClaimTypes.Email, user.Email!),
				new Claim("purpose", "password_reset")
				//new Claim(ClaimTypes.Role, user.Role)

			};

			var token = new JwtSecurityToken(
				issuer: jwtSettings ["Issuer"],
				audience: jwtSettings ["Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(time),
				signingCredentials: creds
			);


			var tokenvalue = new JwtSecurityTokenHandler().WriteToken(token);
			var refreshtoken = Guid.NewGuid().ToString("N").ToLower();

			user.RefreshToken = refreshtoken;

			//user.RefreshToken = refreshtoken;

			return tokenvalue;

			//return new AuthTokenDto
			//{
			//	Token = tokenvalue,
			//	RefreshToken = user.RefreshToken,
			//	Role = user.Role,

			//};

		}
	}
}
