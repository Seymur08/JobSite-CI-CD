using Job_Site.Dtos;
using Job_Site.Dtos.Password;
using Job_Site.Pagination;
using Job_Site.Services;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Job_Site.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		private readonly IHomeServices _homeService;

		public HomeController(IHomeServices homeService)
		{
			_homeService = homeService;
		}

		[HttpPost("GetAllPermissionWorkers")]
		public async Task<ActionResult<WorkerJobLisDto>> GetAllPermissionWorkers([FromBody] RequestBody requestBody)
		{
			var emp = await _homeService.GetAllPermissionWorkers(requestBody);
			if( emp is not null )
				return Ok(emp);
			return BadRequest("Worker not found");
		}


		[HttpPost("GetAllPermissionEmployers")]
		public async Task<ActionResult<EmployerJobListDto>> GetAllPermissionEmployers([FromBody] RequestBody requestBody)
		{

			var emp = await _homeService.GetAllPermissionEmployers(requestBody);
			if( emp is not null )
				return Ok(emp);
			return BadRequest("Category not working");


		}


		[HttpGet("AllAdvertCount")]
		public async Task<ActionResult> AllAdvertCount()
		{
			return Ok(await _homeService.AllAdvertCount());
		}



		[HttpGet("GetUserAbout")]
		public async Task<ActionResult<UserDto>> GetUserAbout()
		{
			var user = await _homeService.GetUserAbout();
			if( user is not null )
				return Ok(user);
			return BadRequest();

		}

		[HttpPost("ChangeImage")]
		public async Task<ActionResult> ChangeImage([FromForm] IFormFile ProfileImage)
		{
			var isok = await _homeService.ChangeImage(ProfileImage);
			if( isok)
				return Ok();
			return BadRequest();

		}
	}
}
