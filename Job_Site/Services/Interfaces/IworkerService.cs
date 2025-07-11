using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models;
using System.Security.Cryptography.X509Certificates;

namespace Job_Site.Services.Interfaces
{
	// Elan paylasma(birden cox elan olabiler), silme, yenileme, sifre deyisme, elana muraciyyet
	// etmek ve bir  Employer-in butun elanlarina baxmak bacarigin sahibdir.

	public interface IworkerService
	{
		public Task<bool> Register(RegisterReguestDto registerReguestDto);
		public Task<AuthTokenDto> Login(LoginReguestDto loginReguestDto);
		public Task<bool> AddAdvertisement(WorkerJobLisDto workerJobLisDto);
		public Task<bool> RemoveAdvertisement(IdRequest idrequest);
		public Task<bool> UpdateAdvertisement(WorkerJobLisDto workerJobLisDto);
		public Task ChangePassword(string password);
		public Task ToApplyAdvertisement(Guid id);
		//public Task<UserDto> GetUserAbout();
		public Task<List<WorkerJobLisDto>> GetAllAdvertisement(IdRequest idrequest);

		public Task<List<WorkerJobLisDto>> GetAllWorkerJobs();

		public Task<WorkerJobLisDto> GetAdvertWorkerById(IdRequest idRequest);	
		
			

	}
}
