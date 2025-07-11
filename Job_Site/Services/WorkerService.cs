using ASP_.NET_WEP_API_JWT.Auth;
using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models;
using Job_Site.Models.Announcement;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System.Numerics;
using System.Reflection;
using System.Security.Claims;

namespace Job_Site.Services
{
	public class WorkerService : IworkerService
	{

		private readonly AppDbContext _appDbContext;

		private readonly UserManager<User> _userManager;

		private readonly HttpContext _httpContext;

		private readonly AuthenticationService _authenticationService;

		private readonly ILogger<WorkerService> _logger;

		private readonly IWebHostEnvironment _webHostEnvironment;

		public WorkerService(AppDbContext appDbContext, UserManager<User> userManager,
			IHttpContextAccessor httpContext, AuthenticationService authenticationService,
			IWebHostEnvironment webHostEnvironment, ILogger<WorkerService> logger)
		{
			_appDbContext = appDbContext;
			_userManager = userManager;
			_httpContext = httpContext.HttpContext;
			_authenticationService = authenticationService;
			_webHostEnvironment = webHostEnvironment;
			_logger = logger;
		}

		public async Task<bool> Register(RegisterReguestDto reguestDto)
		{
			string? imagePath = null;

			if( reguestDto.ProfileImagePath != null )
			{
				var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "profile-images");
				if( !Directory.Exists(uploadsFolder) )
					Directory.CreateDirectory(uploadsFolder);

				var fileName = Guid.NewGuid().ToString() + Path.GetExtension(reguestDto.ProfileImagePath.FileName);
				var filePath = Path.Combine(uploadsFolder, fileName);

				using( var stream = new FileStream(filePath, FileMode.Create) )
				{
					await reguestDto.ProfileImagePath.CopyToAsync(stream);
				}

				imagePath = $"/profile-images/{fileName}";
			}


			var user = new User
			{
				Id = Guid.NewGuid(),
				UserName = reguestDto.UserName,
				NormalizedUserName = reguestDto.UserName?.ToUpper(),
				Surname = reguestDto.SurName,
				Age = reguestDto.Age,
				Email = reguestDto.Email,
				NormalizedEmail = reguestDto.Email?.ToUpper(),
				PhoneNumber = reguestDto.Phone,
				Gender = reguestDto.Gender,
				Role = reguestDto.Role,
				CreatedAt = DateTimeOffset.UtcNow,
				ProfileImagePath = imagePath
			};

			if( user is not null )
			{

				var result = await _userManager.CreateAsync(user, reguestDto.Password!);

				if( result.Succeeded )
				{
					var worker = new Worker
					{
						Id = Guid.NewGuid(),
						UserId = user.Id,
					};

					await _appDbContext.Workers.AddAsync(worker);
					await _appDbContext.SaveChangesAsync();
					return true;
				}

			}

			return false;
		}

		public async Task<AuthTokenDto> Login(LoginReguestDto loginReguestDto)
		{
			var token = await _authenticationService.Authenticate(loginReguestDto, 20);
			return token!;
		}

		public async Task<bool> AddAdvertisement(WorkerJobLisDto workerJobLisDto)
		{
			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;


			var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == usermail);

			if( user is not null )
			{
				var worker = await _appDbContext.Workers.FirstOrDefaultAsync(i => i.UserId == user.Id);

				if( worker is not null )
				{

					var workerjob = new WorkerJobList
					{
						Id = Guid.NewGuid(),
						WorkerId = worker.Id,
						Age = workerJobLisDto.Age,
						Adress = workerJobLisDto.Adress,
						Category = workerJobLisDto.Category,
						Section = workerJobLisDto.Section,
						WorkExperience = workerJobLisDto.WorkExperience,
						Education = workerJobLisDto.Education,
						Salary = workerJobLisDto.Salary,
						Phone = workerJobLisDto.Phone,
						Email = workerJobLisDto.Email,
						Gender = workerJobLisDto.Gender,
						Detailed = workerJobLisDto.Detailed,
						CreatedAt = DateTimeOffset.UtcNow,
						DeadlineAt = DateTimeOffset.UtcNow.AddDays(7),
						status = Status.Waiting,
						View_Count = 0

					};

					await _appDbContext.WorkerJobLists.AddAsync(workerjob);
					await _appDbContext.SaveChangesAsync();

					Network.Send_Message(usermail, $" Hormetli {user} Muellim Sizin JobGate.az saytinda paylasdiginiz" +
						$" elan Gozlemededir 12 saat erzinde elaniniz sayta yerlesdirilecek. Bizi secdiyiniz ucun Tesekkurler");
					return true;

				}

			}

			return false;
		}

		public Task<List<WorkerJobLisDto>> GetAllAdvertisement(IdRequest idrequest)
		{

			//////////////////////////////////////////
			///

			throw new NotImplementedException();
		}


		public async Task<bool> RemoveAdvertisement(IdRequest idrequest)
		{
			var workerjob = await _appDbContext.WorkerJobLists.FirstOrDefaultAsync(i => i.Id == idrequest.Id);
			if( workerjob is not null )
			{
				_appDbContext.WorkerJobLists.Remove(workerjob);
				await _appDbContext.SaveChangesAsync();
				return true;
			}
			return false;


		}

		public Task ToApplyAdvertisement(Guid id)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> UpdateAdvertisement(WorkerJobLisDto workerJobLisDto)
		{
			var workerjob = await _appDbContext.WorkerJobLists.FirstOrDefaultAsync(i => i.Id == workerJobLisDto.Id);

			if( workerjob is not null )
			{
				workerjob.Adress = workerJobLisDto.Adress;
				workerjob.WorkExperience = workerJobLisDto.WorkExperience;
				workerjob.Education = workerJobLisDto.Education;
				workerjob.Salary = workerJobLisDto.Salary;
				workerjob.Phone = workerJobLisDto.Phone;
				workerjob.Email = workerJobLisDto.Email;
				workerjob.Detailed = workerJobLisDto.Detailed;
				workerjob.Age = workerJobLisDto.Age;
				workerjob.UpdatedAt = DateTimeOffset.UtcNow;

				_appDbContext.Update(workerjob);
				_appDbContext.SaveChanges();
				return true;
			}

			return false;
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

		public async Task<List<WorkerJobLisDto>> GetAllWorkerJobs()
		{

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			var user = await _appDbContext.Users.FirstOrDefaultAsync(i => i.Email == usermail);

			var alljoblist = await _appDbContext.WorkerJobLists
				.Include(i => i.worker)
				.ThenInclude(u => u.User)
				.Where(e => e.worker.User.Email == usermail)
				.Select(e => new WorkerJobLisDto
				{
					Age = e.Age,
					//UserName = e.worker.User.UserName,
					//SurName = e.worker.User.Surname,
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
							ProfileImagePath = user.ProfileImagePath
						} )
					} )
				}).ToListAsync();

			return alljoblist;
		}

		public async Task<WorkerJobLisDto> GetAdvertWorkerById(IdRequest idRequest)
		{
			var job = await _appDbContext.WorkerJobLists
				.Include(i => i.worker)
				.ThenInclude(i => i.User)
				.FirstOrDefaultAsync(x => x.Id == idRequest.Id);

			job.View_Count += 1;
			await _appDbContext.SaveChangesAsync();

			var emp = new WorkerJobLisDto
			{
				Age = job.Age,
				Adress = job.Adress,
				Phone = job.Phone,
				Email = job.Email,
				Category = job.Category,
				Section = job.Section,
				Gender = job.Gender,
				WorkExperience = job.WorkExperience,
				Education = job.Education,
				CreatedAt = job.CreatedAt,
				DeadlineAt = job.DeadlineAt,
				UpdatedAt = job.UpdatedAt,
				Detailed = job.Detailed,
				Salary = job.Salary,

				Id = job.Id,
				View_Count = job.View_Count,
				workerDto = new WorkerDto
				{
					Id = job.Id,
					UserDto = new UserDto
					{

						UserName = job.worker?.User?.UserName,
						SurName = job.worker?.User?.Surname,
					}
				}


			};
			return emp;

		}

		public Task ChangePassword(string password)
		{
			throw new NotImplementedException();
		}
	}
}
