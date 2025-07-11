using ASP_.NET_WEP_API_JWT.Auth;
using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Azure.Core;
using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models;
using Job_Site.Models.Announcement;
using Job_Site.Models.Categorys;
using Job_Site.Pagination;


//using Job_Site.RedusServicess;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel;
using System.Numerics;
using System.Reflection;
using System.Security.Claims;

namespace Job_Site.Services
{
	public class AdminService : IAdminServices
	{

		private readonly AppDbContext _appDbContext;

		private readonly UserManager<User> _userManager;

		private readonly HttpContext _httpContext;

		private readonly AuthenticationService _authenticationService;
		private readonly ILogger<AdminService> _logger;

		public AdminService(AppDbContext appDbContext, UserManager<User> userManager,
			IHttpContextAccessor httpContext, AuthenticationService authenticationService,
			ILogger<AdminService> logger)
		{
			_appDbContext = appDbContext;
			_userManager = userManager;
			_httpContext = httpContext.HttpContext;
			_authenticationService = authenticationService;
			_logger = logger;

		}


		public async Task<AuthTokenDto> Login(LoginReguestDto loginReguestDto)
		{
			var user = await _userManager.FindByEmailAsync(loginReguestDto.Email);

			if( user == null )
				throw new UnauthorizedAccessException("İstifadəçi tapılmadı");

			var isCheck = await _userManager.CheckPasswordAsync(user, loginReguestDto.Password);

			if( !isCheck )
				throw new UnauthorizedAccessException("Şifrə yanlışdır");

			var token = await _authenticationService.Authenticate(loginReguestDto, 1);
			return token!;
		}

		public async Task<bool> AddNewCategory(RequestCategory requestCategory)
		{

			if( requestCategory == null || string.IsNullOrWhiteSpace(requestCategory.Category) )
				throw new ArgumentException("Category adı boş ola bilməz");

			if( requestCategory.isItNew == true )
			{
				try
				{
					// Yeni category yarat
					bool exists = await _appDbContext.EmployerCategories.AnyAsync(c => c.Category == requestCategory.Category);
					if( exists )
						throw new InvalidOperationException("Bu category artıq mövcuddur.");

					var newCategoryemp = new EmployerCategory
					{
						Id = Guid.NewGuid(),
						Category = requestCategory.Category,
						Count = 0
					};

					if( !string.IsNullOrWhiteSpace(requestCategory.Section) )
					{
						newCategoryemp.Section.Add(new EmployerCategorySection
						{
							id = Guid.NewGuid(),
							Section = requestCategory.Section,
							EmployerCategoryId = newCategoryemp.Id
						});
						//newCategory.Count = 1;
					}


					var newCategorywor = new WorkerCategory
					{
						Id = Guid.NewGuid(),
						Category = requestCategory.Category,
						Count = 0
					};

					if( !string.IsNullOrWhiteSpace(requestCategory.Section) )
					{
						newCategorywor.Section.Add(new WorkerCategorySection
						{
							id = Guid.NewGuid(),
							Section = requestCategory.Section,
							WorkerCategoryId = newCategorywor.Id
						});
						//newCategory.Count = 1;
					}

					_appDbContext.EmployerCategories.Add(newCategoryemp);
					_appDbContext.WorkerCategories.Add(newCategorywor);
					await _appDbContext.SaveChangesAsync();
					return true;
				}
				catch( Exception ex )
				{
					_logger.LogError(ex, "Xəta baş verdi :yeni category elave etmek zamani ");
				}
			}
			else
			{

				try
				{
					var existsInDb = await _appDbContext.EmployerCategories
								.AnyAsync(c => c.Category == requestCategory.Category);

					if( !existsInDb )
						return false;

					var categoryemp = await _appDbContext.EmployerCategories
						.Include(c => c.Section)
						.FirstOrDefaultAsync(c => c.Category == requestCategory.Category);

					var categorywor = await _appDbContext.WorkerCategories
						.Include(c => c.Section)
						.FirstOrDefaultAsync(c => c.Category == requestCategory.Category);

					if( !string.IsNullOrWhiteSpace(requestCategory.Section) )
					{
						// Section gore yoxlanis etmek
						var newSectionemp = new EmployerCategorySection
						{
							id = Guid.NewGuid(),
							Section = requestCategory.Section,
							EmployerCategoryId = categoryemp.Id
						};


						_appDbContext.Entry(newSectionemp).State = EntityState.Added;


						var newSectionwor = new WorkerCategorySection
						{
							id = Guid.NewGuid(),
							Section = requestCategory.Section,
							WorkerCategoryId = categorywor.Id
						};


						_appDbContext.Entry(newSectionwor).State = EntityState.Added;

						await _appDbContext.SaveChangesAsync();
					}

				}
				catch( Exception ex )
				{
					_logger.LogError(ex, "Xəta baş verdi : category var olana elave etmek  zamani");
				}


			}

			return false;
		}
		public async Task<List<WorkerCategory>> GetAllCategoryWorker()
		{

			var categories = await _appDbContext.WorkerCategories
				   .Include(c => c.Section)
				   .ToListAsync();

			var all = categories.Select(c => new WorkerCategory
			{
				Id = c.Id,
				Count = c.Count,
				Category = c.Category,
				Section = c.Section.Select(sc => new WorkerCategorySection
				{
					id = sc.id,
					Section = sc.Section,
				}).ToList()
			}).ToList();

			return all;

		}


		public async Task<List<EmployerCategory>> GetAllCategoryEmployer()
		{

			var categories = await _appDbContext.EmployerCategories
				   .Include(c => c.Section)
				   .ToListAsync();

			var all = categories.Select(c => new EmployerCategory
			{
				Id = c.Id,
				Count = c.Count,
				Category = c.Category,
				Section = c.Section.Select(sc => new EmployerCategorySection
				{
					id = sc.id,
					Section = sc.Section,
				}).ToList()
			}).ToList();

			return all;

		}

		public async Task<List<WorkerJobLisDto>> GetAllWorkers()
		{

			var alljoblist = await _appDbContext.WorkerJobLists
						.Include(i => i.worker)
						.ThenInclude(u => u.User)
						.Where(e => e.status == Status.Waiting)
						.Select(e => new WorkerJobLisDto
						{
							Age = e.Age,
							Adress = e.Adress,
							Phone = e.Phone,
							Email = e.Email,
							CreatedAt = e.CreatedAt,
							UpdatedAt = e.UpdatedAt,
							Category = e.Category,
							Section = e.Section,
							Gender = e.Gender,
							WorkExperience = e.WorkExperience,
							Education = e.Education,
							Detailed = e.Detailed,
							Salary = e.Salary,
							View_Count = e.View_Count,
							Id = e.Id,
							status = e.status,
							workerDto = ( new WorkerDto
							{
								Id = e.worker.Id,
								UserDto = ( new UserDto
								{
									UserName = e.worker.User.UserName,
									SurName = e.worker.User.Surname,
									Age = e.worker.User.Age,
									IsBloocked = e.worker.User.IsBloocked,
									ProfileImagePath = e.worker.User.ProfileImagePath
								} )
							} )
						}).ToListAsync();

			return alljoblist;


		}

		public async Task<List<EmployerJobListDto>> GetAllEmployers()
		{



			var all = await _appDbContext.EmployerJobLists
						.Include(i => i.employer)
						.ThenInclude(u => u.User)
				 .Where(e => e.status == Status.Waiting)
				 .Select(e => new EmployerJobListDto
				 {
					 Id = e.Id,
					 Section = e.Section,
					 Category = e.Category,
					 Phone = e.Phone,
					 Email = e.Email,
					 Company = e.Company,
					 Work_experience = e.Work_experience,
					 Contact_person = e.Contact_person,
					 Work_time = e.Work_time,
					 Work_schedule = e.Work_schedule,
					 Requirements = e.Requirements,
					 Address = e.Address,
					 Salary_Min = e.Salary_Min,
					 Salary_Max = e.Salary_Max,
					 Age_Min = e.Age_Min,
					 Age_Max = e.Age_Max,
					 CreatedAt = e.CreatedAt,
					 UpdatedAt = e.UpdatedAt,
					 DeadlineAt = e.DeadlineAt,
					 employerDto = ( new EmployerDto
					 {
						Id = e.employer.Id,
						 User = ( new UserDto
						 {
							 UserName = e.employer.User.UserName,
							 SurName = e.employer.User.Surname,
							 Age = e.employer.User.Age,
							 IsBloocked = e.employer.User.IsBloocked,
							 ProfileImagePath = e.employer.User.ProfileImagePath
						 } )
					 } )
				 }).ToListAsync();

			return all;
		}

		public async Task<List<WorkerJobLisDto>> GetAllWorkersStatus()
		{
			var all = await _appDbContext.WorkerJobLists.
				Where(i => i.status == Status.Waiting).
				Select(e => new WorkerJobLisDto
				{
					Id = e.Id,
					Adress = e.Adress,
					Category = e.Category,
					Section = e.Section,
					WorkExperience = e.WorkExperience,
					Education = e.Education,
					Salary = e.Salary,
					Age = e.Age,
					Phone = e.Phone,
					Email = e.Email,
					Gender = e.Gender,
					Detailed = e.Detailed,

				}).ToListAsync();
			return all;
		}

		public async Task<List<EmployerJobListDto>> GetAllEmployersStatus()
		{
			var all = await _appDbContext.EmployerJobLists
				 .Where(e => e.status == Status.Waiting)
				 .Select(e => new EmployerJobListDto
				 {
					 Id = e.Id,
					 Category = e.Category,
					 Phone = e.Phone,
					 Email = e.Email,
					 Section = e.Section,
					 Company = e.Company,
					 Work_experience = e.Work_experience,
					 Contact_person = e.Contact_person,
					 Work_time = e.Work_time,
					 Work_schedule = e.Work_schedule,
					 Address = e.Address,
					 Salary_Min = e.Salary_Min,
					 Salary_Max = e.Salary_Max,
					 Age_Min = e.Age_Min,
					 Age_Max = e.Age_Max,

				 })
				.ToListAsync();

			return all;
		}

		public async Task<bool> ChangeStatusEmployer(StatusCodeDto statusCode)
		{
			var joblist = _appDbContext.EmployerJobLists.FirstOrDefault(x => x.Id == statusCode.Id);

			var user = await _appDbContext.Users.FirstOrDefaultAsync(i => i.Email == joblist.Email);

			if( joblist is not null )
			{
				if( statusCode.Status == "Ok" )
				{
					joblist.status = Status.Confirmed;
					_appDbContext.Update(joblist);
					await _appDbContext.SaveChangesAsync();
					Network.Send_Message(user.Email, $" Hormetli {user.UserName} Muellim Sizin JobGate.az saytinda paylasdiginiz elan Testiqlenmisdir");

					var subCategory = await _appDbContext.EmployerCategories
					.Include(sc => sc.Section)
					.FirstOrDefaultAsync(s => s.Section.Any(i => i.Section == joblist.Section));

					if( subCategory != null )
					{
						subCategory.Count += 1;
						await _appDbContext.SaveChangesAsync();
					}

					return true;

				}
				else if( statusCode.Status == "No" )
				{
					joblist.status = Status.Rejected;
					_appDbContext.Update(joblist);
					await _appDbContext.SaveChangesAsync();
					Network.Send_Message(user.Email, $" Hormetli {user.UserName} Muellim Sizin JobGate.az saytinda paylasdiginiz elan Rədd edildi");
					return true;

				}

			}

			return false;
		}

		public async Task<bool> ChangeStatusWorker(StatusCodeDto statusCode)
		{
			var joblist = await _appDbContext.WorkerJobLists.FirstOrDefaultAsync(x => x.Id == statusCode.Id);

			var user = await _appDbContext.Users.FirstOrDefaultAsync(i => i.Email == joblist.Email);

			if( joblist is not null )
			{
				if( statusCode.Status == "Ok" )
				{
					joblist.status = Status.Confirmed;
					_appDbContext.Update(joblist);
					await _appDbContext.SaveChangesAsync();

					Network.Send_Message(user.Email, $" Hormetli {user.UserName} Muellim Sizin JobGate.az saytinda paylasdiginiz elan Testiqlenmisdir");

					var subCategory = await _appDbContext.WorkerCategories
					.Include(sc => sc.Section)
						.FirstOrDefaultAsync(sc => sc.Section.Any(i => i.Section == joblist.Section));

					if( subCategory != null )
					{
						subCategory.Count += 1;
						await _appDbContext.SaveChangesAsync();
					}


					return true;

				}
				else if( statusCode.Status == "No" )
				{
					joblist.status = Status.Rejected;
					_appDbContext.Update(joblist);
					await _appDbContext.SaveChangesAsync();

					Network.Send_Message(user.Email, $" Hormetli {user.UserName} Muellim Sizin JobGate.az saytinda paylasdiginiz elan Rədd edildi");
					return true;

				}
			}

			return false;
		}

		public async Task<List<WorkerJobLisDto>> AllBlokedWorker()
		{
		
			var workersjobs = await _appDbContext.WorkerJobLists
				.Include(i => i.worker).
				ThenInclude(i => i.User)
				.Where(w => w.worker.User.IsBloocked == true)
				.Select(e => new WorkerJobLisDto
				{
					Id = e.Id,
					Adress = e.Adress,
					Category = e.Category,
					Section = e.Section,
					WorkExperience = e.WorkExperience,
					Education = e.Education,
					Salary = e.Salary,
					Age = e.Age,
					Phone = e.Phone,
					Email = e.Email,
					Gender = e.Gender,
					Detailed = e.Detailed,

				}).ToListAsync();

			return workersjobs;

		}

		public async Task<List<EmployerJobListDto>> AllBlokedEmployer()
		{
			var employerjobs = await _appDbContext.EmployerJobLists
				.Include(i => i.employer).
				ThenInclude(i => i.User)
				.Where(e => e.employer.User.IsBloocked)
				.Select(e => new EmployerJobListDto
				{
					Id = e.Id,
					Category = e.Category,
					Section = e.Section,
					Phone = e.Phone,
					Email = e.Email,
					Company = e.Company,
					Work_experience = e.Work_experience,
					Contact_person = e.Contact_person,
					Work_time = e.Work_time,
					Work_schedule = e.Work_schedule,
					Address = e.Address,
					Salary_Min = e.Salary_Min,
					Salary_Max = e.Salary_Max,
					Age_Min = e.Age_Min,
					Age_Max = e.Age_Max,

				})
				.ToListAsync();

			return employerjobs;
		}

		public int CreatePassword()
		{
			Random random = new Random();
			int number = random.Next(100000, 1000000);
													   
			return number;
		}

		public async Task<int> AllAdvertCount()
		{

			var allworkerscount = await _appDbContext.WorkerJobLists.CountAsync();
			var allemployerscount = await _appDbContext.EmployerJobLists.CountAsync();

			return allemployerscount + allemployerscount;
		}

	}
}
