using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace Job_Site.Services.Interfaces
{
	public interface IHomeServices
	{
		public Task<PaginationListDto<WorkerJobLisDto>> GetAllPermissionWorkers(RequestBody requestBody);
		public Task<PaginationListDto<EmployerJobListDto>> GetAllPermissionEmployers(RequestBody requestBody);
		public Task<int> AllAdvertCount();

		public Task<UserDto> GetUserAbout();

		public Task<bool> ChangeImage(IFormFile ProfileImage);
	}
}
	