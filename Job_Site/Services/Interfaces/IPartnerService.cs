using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Dtos;

namespace Job_Site.Services.Interfaces
{
	public interface IPartnerService
	{
		public Task<AuthTokenDto> Login(LoginReguestDto loginReguestDto);
	}
}
