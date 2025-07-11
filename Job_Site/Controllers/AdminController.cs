using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models;
using Job_Site.Models.Categorys;
using Job_Site.Pagination;
using Job_Site.Services;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Job_Site.Controllers
{
	//[Authorize]
	[Authorize(Roles = "Admin")]
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly IAdminServices _adminServices;
		private readonly AppDbContext _appDbContext;

		public AdminController(IAdminServices adminServices, AppDbContext appDbContext)
		{
			_adminServices = adminServices;
			_appDbContext = appDbContext;
		}


		//[AllowAnonymous]
		[HttpPost("Login")]
		public async Task<ActionResult> Login([FromBody] LoginReguestDto loginReguestDto)
		{

			var tk = await _adminServices.Login(loginReguestDto);

			if( tk != null )
				return Ok(new { Token = tk });


			return BadRequest("login not working");

		}


		//[AllowAnonymous]
		[HttpPost("AddNewCategory")]
		public async Task<ActionResult> AddNewCategory([FromBody] RequestCategory requestCategory)
		{

			var isOk = await _adminServices.AddNewCategory(requestCategory);
			if( isOk )
				return Ok();

			return BadRequest("Category not added");

		}



		//[AllowAnonymous]
		[HttpGet("AllBlokedWorker")]
		public async Task<ActionResult<List<WorkerJobLisDto>>> AllBlokedWorker()
		{

			var wor = await _adminServices.AllBlokedWorker();

			if( wor != null )
			{
				return Ok(wor);
			}

			return BadRequest("not found bolck worker");
		}


		//[AllowAnonymous]
		[HttpGet("AllBlokedEmployer")]
		public async Task<ActionResult<EmployerJobListDto>> AllBlokedEmployer()
		{

			var emp = await _adminServices.AllBlokedEmployer();

			if( emp != null )
			{
				return Ok(emp);
			}

			return BadRequest("not found bolck employer");
		}


		[HttpPost("ToWarnUser")]
		public ActionResult ToWarnUser()
		{
			return Ok("Admin Controller is working");

		}

		[AllowAnonymous]
		[HttpGet("GetAllCategoryWorker")]
		//public async Task<List<WorkerCategory>> GetAllCategoryWorker()
		public async Task<ActionResult<WorkerCategory>> GetAllCategoryWorker()
		{
			var category = await _adminServices.GetAllCategoryWorker();
			if( category is not null )
				return Ok(category);
			return BadRequest("Category not working");

		}

		[AllowAnonymous]
		[HttpGet("GetAllCategoryEmployer")]
		//public async Task<List<WorkerCategory>> GetAllCategoryWorker()
		public async Task<ActionResult<WorkerCategory>> GetAllCategoryEmployer()
		{
			var category = await _adminServices.GetAllCategoryEmployer();
			if( category is not null )
				return Ok(category);
			return BadRequest("Category not working");

		}

		//[AllowAnonymous]
		[HttpGet("GetAllWorkers")]
		public async Task<ActionResult<WorkerJobLisDto>> GetAllWorkers()
		{
			var emp = await _adminServices.GetAllWorkers();
			if( emp is not null )
				return Ok(emp);
			return BadRequest("Category not working");
		}

		//[AllowAnonymous]
		[HttpGet("GetAllEmployers")]
		public async Task<ActionResult<EmployerJobListDto>> GetAllEmployers()
		{
			var emp = await _adminServices.GetAllEmployers();
			if( emp is not null )
				return Ok(emp);
			return BadRequest("Category not working");

			//throw new NotImplementedException();

		}


		//[AllowAnonymous]
		[HttpGet("GetAllWorkersStatus")]
		public async Task<ActionResult<WorkerJobLisDto>> GetAllWorkersStatus()
		{
			var emp = await _adminServices.GetAllWorkersStatus();
			if( emp is not null )
				return Ok(emp);
			return BadRequest("Category not working");
		}

		//[AllowAnonymous]
		[HttpGet("GetAllEmployersStatus")]
		public async Task<ActionResult<EmployerJobListDto>> GetAllEmployersStatus()
		{
			var emp = await _adminServices.GetAllEmployersStatus();
			if( emp is not null )
				return Ok(emp);
			return BadRequest("Category not working");

			//throw new NotImplementedException();

		}


		//[AllowAnonymous]
		[HttpPost("ChangeStatusEmployer")]
		public async Task<ActionResult> ChangeStatusEmployer(StatusCodeDto statusCodeDto)
		{
			var isOk = await _adminServices.ChangeStatusEmployer(statusCodeDto);
			if( isOk )
				return Ok("Status Changed");
			return BadRequest("Status not Changed");

		}

		[HttpPost("ChangeStatusWorker")]
		public async Task<ActionResult> ChangeStatusWorker(StatusCodeDto statusCodeDto)
		{
			var isOk = await _adminServices.ChangeStatusWorker(statusCodeDto);
			if( isOk )
				return Ok("Status Changed");
			return BadRequest("Status not Changed");

		}

	}
}
