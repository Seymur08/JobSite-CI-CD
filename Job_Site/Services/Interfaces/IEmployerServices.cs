using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Dtos;
using Job_Site.Models;

namespace Job_Site.Services.Interfaces
{
	public interface IEmployerServices
	{
		public Task<bool> Register(RegisterReguestDto registerReguest);
		public Task<AuthTokenDto> Login(LoginReguestDto loginReguestDto);
		public Task<bool> AddAdvertisement(EmployerJobListDto employerJobList);
		public Task<bool> RemoveAdvertisement(IdRequest idRequest);
		public Task<bool> UpdateAdvertisement(EmployerJobListDto employerJobList);
		public Task<bool> ChangePassword(string oldpassword, string newpassword);
		public Task ToApplyAdvertisement(Guid Id);// status code burda ferqli meqsed ucun edilir
		public Task<List<EmployerJobListDto>> GetAllAdvertisement();	
		public Task<EmployerJobListDto> GetAdvertEmployerById(IdRequest idRequest);	

		public Task<bool> ChangeStatus(StatusCodeDto statusCode);// burda ils basqa meqsed ucun iledilir 
		public Task<bool> BlockUser(StatusCodeDto statusCode);  // public async Task<bool> BlockUser(StatusCodeDto statusCode)
	}
}
