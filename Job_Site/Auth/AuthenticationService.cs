//using ASP_.NET_WEP_API_JWT.DTOs;
//using ASP_.NET_WEP_API_JWT.DTOs.Auth;
//using ASP_.NET_WEP_API_JWT.Models;
using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Azure.Core;
using Job_Site.Dtos;
using Job_Site.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Azure;

namespace ASP_.NET_WEP_API_JWT.Auth
{
	/// <summary>
	/// 
	/// </summary>
	public class AuthenticationService
	{
		private readonly UserManager<User> _userManager;
		private readonly IConfiguration _config;

		private readonly IHttpContextAccessor _httpContextAccessor;

		public AuthenticationService(UserManager<User> userManager, IConfiguration config, IHttpContextAccessor httpContextAccessor)
		{
			_userManager = userManager;
			_config = config;
			_httpContextAccessor = httpContextAccessor;
		}

		public async Task<AuthTokenDto?> Authenticate(LoginReguestDto loginReguest,int time )
		{
			var user = await _userManager.FindByEmailAsync(loginReguest.Email);

			if( user is not null )
			{
				var ischeck = await _userManager.CheckPasswordAsync(user, loginReguest.Password);

				if( ischeck )
				{
					var token = await GenerateJwtToken(user,time);

					await _userManager.UpdateAsync(user);
					return token;
				}

			}
			return null;
		}

		public async Task<AuthTokenDto> GenerateJwtToken(User user, int time)
		{
			var jwtSettings = _config.GetSection("Jwt");
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings ["Key"]!));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var claims = new []
			{
				//new Claim (ClaimsIdentity.DefaultNameClaimType, user.Email!),
				new Claim (ClaimsIdentity.DefaultNameClaimType, user.UserName!),
				new Claim(ClaimTypes.Email, user.Email!),
				new Claim(ClaimTypes.Role, user.Role),
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),

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

			return new AuthTokenDto 
			{
				Token = tokenvalue,
				RefreshToken = user.RefreshToken,
				Role = user.Role,

			};

		}

		public string GetCookiesRefreshToken()
		{
			return _httpContextAccessor.HttpContext.Request.Cookies ["RefreshToken"];
		
		}


	}
}
