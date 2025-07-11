using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models.Announcement;
using Job_Site.Models;
using Job_Site.Pagination;
using Job_Site.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Job_Site.Services
{
	public class HomeService : IHomeServices
	{

		private readonly AppDbContext _appDbContext;

		private readonly HttpContext _httpContext;

		private readonly IWebHostEnvironment _env;

		public HomeService(AppDbContext appDbContext, IHttpContextAccessor httpContext, IWebHostEnvironment env)
		{
			_appDbContext = appDbContext;
			_httpContext = httpContext.HttpContext;
			_env = env;
		}

		public async Task<PaginationListDto<WorkerJobLisDto>> GetAllPermissionWorkers(RequestBody requestBody)
		{


			IQueryable<WorkerJobList> query = _appDbContext.WorkerJobLists
				.Where(i => i.status == Status.Confirmed);


			if( !string.IsNullOrEmpty(requestBody.category) )
			{
				query = query.Where(i => i.Category == requestBody.category);
			}

			if( !string.IsNullOrEmpty(requestBody.section) )
			{
				query = query.Where(i => i.Section == requestBody.section);
			}

			if( !string.IsNullOrEmpty(requestBody.city) )
			{
				query = query.Where(i => i.Adress == requestBody.city);
			}

			if( requestBody.salary > 0)
			{
				query = query.Where(i => i.Salary >= requestBody.salary);  
		
			}

			var items = await query
				.OrderBy(i => i.Id)
				.Skip(( requestBody.page - 1 ) * requestBody.pagesize)
				.Take(requestBody.pagesize)
				.ToListAsync();

			return new PaginationListDto<WorkerJobLisDto>(
				items.Select(item => ConvertWorkerJobDto(item)),
				new PaginationMeta(requestBody.page, requestBody.pagesize, query.Count()));



		}
		public async Task<PaginationListDto<EmployerJobListDto>> GetAllPermissionEmployers(RequestBody requestBody)
		{

			IQueryable<EmployerJobList> query = _appDbContext.EmployerJobLists
				.Where(i => i.status == Status.Confirmed);


			if( !string.IsNullOrEmpty(requestBody.category) )
			{
				query = query.Where(i => i.Category == requestBody.category);
			}

			if( !string.IsNullOrEmpty(requestBody.section) )
			{
				query = query.Where(i => i.Section == requestBody.section);
			}

			if( !string.IsNullOrEmpty(requestBody.city) )
			{
				query = query.Where(i => i.Address == requestBody.city);
			}

			if( requestBody.salary > 0 )
			{
				query = query.Where(i => requestBody.salary <= i.Salary_Min);  /////   int edib >  deyisikliyi 
				
			}

			var items = await query
				.OrderBy(i => i.Id)
				.Skip(( requestBody.page - 1 ) * requestBody.pagesize)
				.Take(requestBody.pagesize)
				.ToListAsync();

			return new PaginationListDto<EmployerJobListDto>(
				items.Select(item => ConvertEmployerJobDto(item)),
				new PaginationMeta(requestBody.page, requestBody.pagesize, query.Count()));

			//var all = await _appDbContext.EmployerJobLists
			//	 .Where(e => e.status == Status.Confirmed)
			//	 .Select(e => new EmployerJobListDto
			//	 {
			//		 Id = e.Id,
			//		 Category = e.Category,
			//		 Phone = e.Phone,
			//		 Section = e.Section,
			//		 Company = e.Company,
			//		 Email = e.Email,
			//		 Work_experience = e.Work_experience,
			//		 Contact_person = e.Contact_person,
			//		 Work_time = e.Work_time,
			//		 Work_schedule = e.Work_schedule,
			//		 Address = e.Address,
			//		 Salary_Min = e.Salary_Min,
			//		 Salary_Max = e.Salary_Max,
			//		 Age_Min = e.Age_Min,
			//		 Age_Max = e.Age_Max,

			//	 })
			//	.ToListAsync();


			//return all;

			throw new NotImplementedException();
		}

		public EmployerJobListDto ConvertEmployerJobDto(EmployerJobList item)
		{
			var employer = new EmployerJobListDto
			{

				Id = item.Id,
				Category = item.Category,
				Phone = item.Phone,
				Section = item.Section,
				Company = item.Company,
				Email = item.Email,
				Work_experience = item.Work_experience,
				Contact_person = item.Contact_person,
				Work_time = item.Work_time,
				Work_schedule = item.Work_schedule,
				Address = item.Address,
				Salary_Min = item.Salary_Min,
				Salary_Max = item.Salary_Max,
				Age_Min = item.Age_Min,
				Age_Max = item.Age_Max,
				CreatedAt = item.CreatedAt,

			};

			return employer;
		}

		public WorkerJobLisDto ConvertWorkerJobDto(WorkerJobList workerJob)
		{
			var dto = new WorkerJobLisDto()
			{
				Id = workerJob.Id,
				Adress = workerJob.Adress,
				Category = workerJob.Category,
				Section = workerJob.Section,
				WorkExperience = workerJob.WorkExperience,
				Education = workerJob.Education,
				Salary = workerJob.Salary,
				Age = workerJob.Age,
				Phone = workerJob.Phone,
				Email = workerJob.Email,
				Gender = workerJob.Gender,
				Detailed = workerJob.Detailed,
				CreatedAt = workerJob.CreatedAt,

			};

			return dto;

		}

		public async Task<int> AllAdvertCount()
		{

			var allworkerscount = await _appDbContext.WorkerJobLists.Where(e => e.status == Status.Confirmed).ToListAsync();
			var allemployerscount = await _appDbContext.EmployerJobLists.Where(e => e.status == Status.Confirmed).ToListAsync();

			return allworkerscount.Count() + allemployerscount.Count();
		}


		public async Task<UserDto> GetUserAbout()
		{
			var email = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			var user = await _appDbContext.Users.FirstOrDefaultAsync(i => i.Email == email);

			if( user is not null )
			{
				var dto = new UserDto()
				{
					Id = user.Id,
					UserName = user.UserName,
					SurName = user.Surname,
					Age = user.Age,
					IsBloocked = user.IsBloocked,
					ProfileImagePath = user.ProfileImagePath,

				};

				return dto;
			}

			return null;
		}

		public async Task<bool> ChangeImage(IFormFile ProfileImage)
		{
			
			if( ProfileImage == null || ProfileImage.Length == 0 )
				return false;

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;


			var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == usermail);


			if( user is null )
				return false;

			// Əvvəlki şəkli sil
			if( !string.IsNullOrEmpty(user.ProfileImagePath) )
			{
				var oldFilePath = Path.Combine(_env.WebRootPath, user.ProfileImagePath.TrimStart('/'));
				if(File.Exists(oldFilePath) )
					File.Delete(oldFilePath);
			}

			// Yeni şəkli yaddaşa yaz
			var uploadsFolder = Path.Combine(_env.WebRootPath, "profile-images"); 
			if( !Directory.Exists(uploadsFolder) )
				Directory.CreateDirectory(uploadsFolder);

			var fileName = Guid.NewGuid() + Path.GetExtension(ProfileImage.FileName);
			var filePath = Path.Combine(uploadsFolder, fileName);

			using( var stream = new FileStream(filePath, FileMode.Create) )
			{
				await ProfileImage.CopyToAsync(stream);
			}

			// İstifadəçidə yeni path saxla
			user.ProfileImagePath = $"/profile-images/{fileName}";
			await _appDbContext.SaveChangesAsync();

			return true;


		}
	}
}
