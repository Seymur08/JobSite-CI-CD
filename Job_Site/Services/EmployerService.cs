using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models;
using Job_Site.Models.Announcement;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Net;
using Azure.Core;
using ASP_.NET_WEP_API_JWT.Auth;
using ASP_.NET_WEP_API_JWT.DTOs.Auth;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Numerics;
using Job_Site.Models.Categorys;
using static System.Collections.Specialized.BitVector32;
using Microsoft.AspNetCore.Hosting;

namespace Job_Site.Services
{
	public class EmployerService : IEmployerServices
	{

		private readonly AppDbContext _appDbContext;

		private readonly UserManager<User> _userManager;

		private readonly HttpContext _httpContext;

		private readonly AuthenticationService _authenticationService;

		private readonly IWebHostEnvironment _webHostEnvironment;

		public EmployerService(AppDbContext appDbContext, UserManager<User> userManager,
			IHttpContextAccessor httpContext, AuthenticationService authenticationService,
			IWebHostEnvironment webHostEnvironment)
		{
			_appDbContext = appDbContext;
			_userManager = userManager;
			_httpContext = httpContext.HttpContext;
			_authenticationService = authenticationService;
			_webHostEnvironment = webHostEnvironment;
		}

		public async Task<bool> Register(RegisterReguestDto registerReguest)
		{

			string? imagePath = null;

			if( registerReguest.ProfileImagePath != null )
			{
				var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "profile-images");
				if( !Directory.Exists(uploadsFolder) )
					Directory.CreateDirectory(uploadsFolder);

				var fileName = Guid.NewGuid().ToString() + Path.GetExtension(registerReguest.ProfileImagePath.FileName);
				var filePath = Path.Combine(uploadsFolder, fileName);

				using( var stream = new FileStream(filePath, FileMode.Create) )
				{
					await registerReguest.ProfileImagePath.CopyToAsync(stream);
				}

				imagePath = $"/profile-images/{fileName}";
			}


			var user = new User
			{
				Id = Guid.NewGuid(),
				UserName = registerReguest.UserName,
				NormalizedUserName = registerReguest.UserName?.ToUpper(),
				Surname = registerReguest.SurName,
				Age = registerReguest.Age,
				Gender = registerReguest.Gender,
				Email = registerReguest.Email,
				NormalizedEmail = registerReguest.Email?.ToUpper(),
				PhoneNumber = registerReguest.Phone,
				Role = registerReguest.Role,
				CreatedAt = DateTimeOffset.UtcNow,
				ProfileImagePath = imagePath,

			};

			if( user is not null )
			{
				var result = await _userManager.CreateAsync(user, registerReguest.Password!);

				if( result.Succeeded )
				{
					var employer = new Employer
					{
						Id = Guid.NewGuid(),
						UserId = user.Id,
					};

					await _appDbContext.Employers.AddAsync(employer);
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

		public async Task<bool> AddAdvertisement(EmployerJobListDto employerJobList)
		{

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Email == usermail);

			if( user is not null )
			{
				var emp = await _appDbContext.Employers.FirstOrDefaultAsync(i => i.UserId == user.Id);

				if( emp is not null )
				{

					var emplist = new EmployerJobList
					{
						Id = Guid.NewGuid(),
						EmployerId = emp.Id,
						Phone = employerJobList.Phone,
						Email = employerJobList.Email,
						Category = employerJobList.Category,
						Section = employerJobList.Section,
						Company = employerJobList.Company,
						Requirements = employerJobList.Requirements,
						Work_experience = employerJobList.Work_experience,
						Contact_person = employerJobList.Contact_person,
						Work_time = employerJobList.Work_time,
						Work_schedule = employerJobList.Work_schedule,
						Address = employerJobList.Address,
						Salary_Min = employerJobList.Salary_Min,
						Salary_Max = employerJobList.Salary_Max,
						Age_Min = employerJobList.Age_Min,
						Age_Max = employerJobList.Age_Max,
						CreatedAt = DateTimeOffset.UtcNow,
						DeadlineAt = DateTimeOffset.Now.AddDays(14),
						status = Status.Waiting,
						View_Count = 0

					};
					
					await _appDbContext.EmployerJobLists.AddAsync(emplist);
					await _appDbContext.SaveChangesAsync();
					return true;
				}


			}

			return false;
		}

		public async Task<bool> ChangePassword(string oldpassword, string newpassword)
		{
			//var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;

			//var user = await _userManager.FindByEmailAsync(usermail!);

			//if( user is not null )
			//{
			//	var ischeck = await _userManager.CheckPasswordAsync(user, oldpassword);

			//	if( ischeck )
			//	{
			//		var ok = await _userManager.ChangePasswordAsync(user, oldpassword, newpassword);

			//		if( ok.Succeeded )
			//			return true;

			//	}

			//}
			return false;

		}

		public async Task<List<EmployerJobListDto>> GetAllAdvertisement()
		{

			var usermail = _httpContext.User.FindFirst(ClaimTypes.Email)?.Value;
			var all = await _appDbContext.EmployerJobLists
				 .Where(e => e.Email == usermail)
				.Select(e => new EmployerJobListDto
				{
					Id = e.Id,
					Category = e.Category,
					Section = e.Section,
					Phone = e.Phone,
					Email = e.Email,
					Company = e.Company,
					Requirements = e.Requirements,
					Work_experience = e.Work_experience,
					Contact_person = e.Contact_person,
					Work_time = e.Work_time,
					Work_schedule = e.Work_schedule,
					Address = e.Address,
					Salary_Min = e.Salary_Min,
					Salary_Max = e.Salary_Max,
					Age_Min = e.Age_Min,
					Age_Max = e.Age_Max,
					status = e.status,
					View_Count = e.View_Count,


				})
				.ToListAsync();

			return all;

		}

		public async Task<bool> RemoveAdvertisement(IdRequest idRequest)
		{
			var joblist = _appDbContext.EmployerJobLists.FirstOrDefault(x => x.Id == idRequest.Id);

			if( joblist is not null )
			{
				_appDbContext.EmployerJobLists.Remove(joblist);

				await _appDbContext.SaveChangesAsync();
				return true;
			}

			return false;
		}

		public Task ToApplyAdvertisement(Guid id)    /////   ? ? ?
		{
			throw new NotImplementedException();
		}

		public async Task<bool> UpdateAdvertisement(EmployerJobListDto employerJobList)
		{
			var joblist = _appDbContext.EmployerJobLists.FirstOrDefault(x => x.Id == employerJobList.Id);

			if( joblist is not null )
			{
				joblist.Id = employerJobList.Id;
				joblist.Category = employerJobList.Category;
				joblist.Section = employerJobList.Section;	
				joblist.Phone = employerJobList.Phone;
				joblist.Email = employerJobList.Email;
				joblist.Address = employerJobList.Address;
				joblist.Requirements = employerJobList.Requirements;
				joblist.Company = employerJobList.Company;
				joblist.Work_experience = employerJobList.Work_experience;
				joblist.Contact_person = employerJobList.Contact_person;
				joblist.Work_time = employerJobList.Work_time;
				joblist.Work_schedule = employerJobList.Work_schedule;
				joblist.Address = employerJobList.Address;
				joblist.Salary_Min = employerJobList.Salary_Min;
				joblist.Salary_Max = employerJobList.Salary_Max;
				joblist.Age_Min = employerJobList.Age_Min;
				joblist.Age_Max = employerJobList.Age_Max;
				joblist.UpdatedAt = DateTimeOffset.UtcNow;
				_appDbContext.Update(joblist);
				await _appDbContext.SaveChangesAsync();
				return true;

			}
			return false;
			//throw new NotImplementedException();
		}


		//private User ConvertDto(RegisterReguestDto registerReguest)
		//{
		//	var user = new User
		//	{
		//		Id = Guid.NewGuid(),
		//		UserName = registerReguest.UserName,
		//		NormalizedUserName = registerReguest.UserName?.ToUpper(),
		//		Surname = registerReguest.SurName,
		//		Age = registerReguest.Age,
		//		Gender = registerReguest.Gender,
		//		Email = registerReguest.Email,
		//		NormalizedEmail = registerReguest.Email?.ToUpper(),
		//		PhoneNumber = registerReguest.Phone,
		//		Role = registerReguest.Role,
		//		CreatedAt = DateTimeOffset.UtcNow,
		//		ProfileImagePath = registerReguest.ProfileImagePath,
		//	};
		//	return user;
		//}


		public async Task<bool> ChangeStatus(StatusCodeDto statusCode)
		{
			var joblist = _appDbContext.EmployerJobLists.FirstOrDefault(x => x.Id == statusCode.Id);

			if( joblist is not null )
			{
				if( statusCode.Status == "Ok" )
				{
					joblist.status = Status.Confirmed;
					//Console.WriteLine($"Confirmed - {Status.Confirmed}");
					_appDbContext.Update(joblist);
					await _appDbContext.SaveChangesAsync();
					return true;

				}
				else if( statusCode.Status == "No" )
				{
					joblist.status = Status.Rejected;
					//Console.WriteLine($"Confirmed - {Status.Rejected}");

					_appDbContext.Update(joblist);
					await _appDbContext.SaveChangesAsync();
					return true;

				}


				//else if( statusCode.Status == "Block" )
				//{
				//	joblist.status = Status.Blocked;
				//	//Console.WriteLine($"Confirmed - {Status.Blocked}");

				//	_appDbContext.Update(joblist);
				//	await _appDbContext.SaveChangesAsync();
				//	return true;

				//}
			}

			return false;
		}


		public async Task<bool> BlockUser(StatusCodeDto statusCode)
		{

			var emplist = await _appDbContext.EmployerJobLists.FirstOrDefaultAsync(x => x.Id == statusCode.Id);

			if( emplist is not null )
			{
				var emp = await _appDbContext.Employers.FirstOrDefaultAsync(i => i.Id == emplist.EmployerId);

				//emp.IsBloocked = true;	

				await _appDbContext.SaveChangesAsync();
				return true;
			}

			return false;
		}

		public async Task<bool> GetFullyInfo(StatusCodeDto statusCode)
		{

			//var emplist = await _appDbContext.EmployerJobLists.FirstOrDefaultAsync(x => x.Id == statusCode.Id);

			//if( emplist is not null )
			//{
			//	var emp = await _appDbContext.Employers.FirstOrDefaultAsync(i => i.Id == emplist.EmployerId);

			//	emp.IsBloocked = true;

			//	await _appDbContext.SaveChangesAsync();
			//	return true;
			//}

			return false;
		}


		public async Task<EmployerJobListDto> GetAdvertEmployerById(IdRequest idRequest)
		{
			var job = await _appDbContext.EmployerJobLists.FirstOrDefaultAsync(x => x.Id == idRequest.Id);


			job.View_Count += 1;
			await _appDbContext.SaveChangesAsync();

			var emp = new EmployerJobListDto
			{
				Id = idRequest.Id,	
				Category = job.Category,
				Section = job.Section,
				Phone = job.Phone,
				Email = job.Email,
				Company = job.Company,
				Work_experience = job.Work_experience,
				Contact_person = job.Contact_person,
				Work_time = job.Work_time,
				Work_schedule = job.Work_schedule,
				Requirements = job.Requirements,
				Address = job.Address,
				Salary_Min = job.Salary_Min,
				Salary_Max = job.Salary_Max,
				Age_Min = job.Age_Min,
				Age_Max = job.Age_Max,
				CreatedAt = job.CreatedAt,
				DeadlineAt = job.DeadlineAt,
				UpdatedAt = job.UpdatedAt,
				//View_Count = job.View_Count

			};

			Console.WriteLine(emp.View_Count);
			Console.WriteLine(emp.View_Count);
			Console.WriteLine(job.View_Count);
			Console.WriteLine(job.View_Count);

			return emp;

		}
	}

}
