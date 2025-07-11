using Job_Site.Dtos;
using Job_Site.Models;
using Job_Site.Models.Announcement;
using Job_Site.Services;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Job_Site.Controllers
{
	//[Authorize]
	[Authorize(Roles = "Worker, Employer, Admin")]
	[Route("api/[controller]")]
	[ApiController]
	public class WorkerController : ControllerBase
	{
		private readonly IworkerService _workerService;

		public WorkerController(IworkerService workerService)
		{
			_workerService = workerService;
		}

		[AllowAnonymous]
		[HttpPost("Register")]
		public async Task<ActionResult> Register([FromForm] RegisterReguestDto registerReguestDto)
		{
			Console.WriteLine("opopopopopopopopop");
			Console.WriteLine("opopopopopopopopop");
			Console.WriteLine("opopopopopopopopop");
			Console.WriteLine("opopopopopopopopop");
			Console.WriteLine("opopopopopopopopop");
			var isOk = await _workerService.Register(registerReguestDto);
			if( isOk )
				return Ok("Worker registered");
			return BadRequest("Worker not registered");
		}

		[AllowAnonymous]
		[HttpPost("Login")]
		public async Task<ActionResult> Login(LoginReguestDto loginReguest)
		{
			var tk = _workerService.Login(loginReguest);

			if( tk is null )
			{
				Unauthorized();
			}

			return Ok(new { Token = tk });

		}

		[HttpPost("AddAdvertisement")]
		public async Task<ActionResult> AddAdvertisement([FromBody] WorkerJobLisDto workerJobLisDto)

		{

			Console.WriteLine("Serverrrr");
			Console.WriteLine("Serverrrr");
			Console.WriteLine("Serverrrr");
			Console.WriteLine("Serverrrr");
			Console.WriteLine("Serverrrr");
			var isOk = await _workerService.AddAdvertisement(workerJobLisDto);

			if( isOk )
				return Ok("Add Advertisement");

			return BadRequest("Employer Advertisement is not working");


		}

		[HttpPost("RemoveAdvertisement")]
		public async Task<ActionResult> RemoveAdvertisement(IdRequest idRequest)
		{
			Console.WriteLine("RemoveAdvertisement(idRequest)");
			Console.WriteLine("RemoveAdvertisement(idRequest)");
			Console.WriteLine("RemoveAdvertisement(idRequest)");
			Console.WriteLine("RemoveAdvertisement(idRequest)");
			var isok = await _workerService.RemoveAdvertisement(idRequest);
			if( isok )
				return Ok("Worker deleted");
			return BadRequest("Worker not deleted");

		}

		[HttpPost("UpdateAdvertisement")]
		public async Task<ActionResult> UpdateAdvertisement([FromBody] WorkerJobLisDto workerJobLisDto)
		{
			var isok = await _workerService.UpdateAdvertisement(workerJobLisDto);
			if( isok )

				return Ok("Worker Update");
			return BadRequest("Worker not Update");

		}

		[HttpPost("ChangePassword")]
		public ActionResult ChangePassword()
		{
			return Ok("Admin Controller is working");

		}

		[HttpPost("ToApplyAdvertisement")]
		public ActionResult ToApplyAdvertisement()
		{
			return Ok("Admin Controller is working");

		}

		[HttpGet("GetAllAdvertisement")]
		public ActionResult GetAllAdvertisement()
		{
			return Ok("Admin Controller is working");

		}


		[HttpGet("GetAllWorkerJobs")]
		public async Task<ActionResult<WorkerJobLisDto>> GetAllWorkerJobs()
		{
			var all = await _workerService.GetAllWorkerJobs();
			return Ok(all);

		}


		//[AllowAnonymous]
		//[Authorize(Roles = "Worker, Employer")]
		[HttpPost("GetAdvertWorkerById")]
		public async Task<ActionResult<WorkerJobLisDto>> GetAdvertWorkerById([FromBody] IdRequest idRequest)
		{
			Console.WriteLine("jsfbowerjhfbeojherbf");
			Console.WriteLine("jsfbowerjhfbeojherbf");
			Console.WriteLine("jsfbowerjhfbeojherbf");
			Console.WriteLine("jsfbowerjhfbeojherbf");
			Console.WriteLine("jsfbowerjhfbeojherbf");
			Console.WriteLine("jsfbowerjhfbeojherbf");
			Console.WriteLine("jsfbowerjhfbeojherbf");
			Console.WriteLine("jsfbowerjhfbeojherbf");

			var worlist = await _workerService.GetAdvertWorkerById(idRequest);
			if( worlist is not null )
				return Ok(worlist);
			return BadRequest("Advertisement not found id");

		}

	}
}
