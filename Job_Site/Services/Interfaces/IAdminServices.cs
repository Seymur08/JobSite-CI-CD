using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Dtos;
using Job_Site.Models;
using Job_Site.Models.Categorys;
using Job_Site.Models.Complaints;
using Job_Site.Pagination;
using System.Numerics;

namespace Job_Site.Services.Interfaces
{
	// Elanlari yoxlaya bilir ve eger nalayiq sözlər yoxdursa elani tesdikleyir.
	// Yeni kategoriya elave ede bilir.
	// Istifadecileri blokluya bilir.
	// Sikayet olunan elanlara baxa bilir.

	public interface IAdminServices : IPartnerService
	{
		public Task<bool> AddNewCategory(RequestCategory requestCategory);
		//public Task<List<CatrgoryNamesDto>> GetAllCategory();
		public Task<List<WorkerCategory>> GetAllCategoryWorker();
		public Task<List<EmployerCategory>> GetAllCategoryEmployer();

		public Task<List<WorkerJobLisDto>> AllBlokedWorker();
		public Task<List<EmployerJobListDto>> AllBlokedEmployer();
		//public Task<bool> ChangePassword(PasswordChangeDto passwordChange);
		//public Task<bool> ConFirmCode(string code);	
		//public Task<bool> GeneratorCode();
		public Task<int> AllAdvertCount();
		public Task<List<WorkerJobLisDto>> GetAllWorkers();
		public Task<List<EmployerJobListDto>> GetAllEmployers();
		public Task<List<WorkerJobLisDto>> GetAllWorkersStatus();
		public Task<List<EmployerJobListDto>> GetAllEmployersStatus();
		//public Task<PaginationListDto<WorkerJobLisDto>> GetAllPermissionWorkers();
		//public Task<PaginationListDto<EmployerJobListDto>> GetAllPermissionEmployers();
		public Task<bool> ChangeStatusEmployer(StatusCodeDto statusCodeDto);// burda ils basqa meqsed ucun iledilir	
		public Task<bool> ChangeStatusWorker(StatusCodeDto statusCodeDto);
		//public Task<EmployerJobListDto> GetAdvertisementById(IdRequest idRequest);
	}
}
