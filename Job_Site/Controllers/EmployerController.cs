using ASP_.NET_WEP_API_JWT.Auth;
using Azure.Core;
using Job_Site.Data;
using Job_Site.Dtos;
using Job_Site.Models;
using Job_Site.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Job_Site.Controllers
{

	[Authorize(Roles = "Employer, Admin, Worker")]
	[Route("api/[controller]")]
	[ApiController]
	public class EmployerController : ControllerBase
	{

		private readonly IEmployerServices _employerServices;

		public EmployerController(IEmployerServices employerServices)
		{
			_employerServices = employerServices;
		}

		[AllowAnonymous]
		[HttpPost("Register")]
		public async Task<ActionResult> Register([FromForm] RegisterReguestDto registerReguest)
		{
			var isOk = await _employerServices.Register(registerReguest);

			if( isOk )
				return Ok("Employer Controller is working");
			return BadRequest("Employer is not register");

		}

		[AllowAnonymous]
		[HttpPost("Login")]
		public async Task<ActionResult> Login([FromBody] LoginReguestDto loginReguestDto)
		{

			var tk = await _employerServices.Login(loginReguestDto);

			if( tk is null )
			{
				Unauthorized();
			}

			return Ok(new { Token = tk });

		}


		[HttpPost("AddAdvertisement")]
		public async Task<ActionResult> AddAdvertisement([FromBody] EmployerJobListDto employerJobList)
		{
			var isOk = await _employerServices.AddAdvertisement(employerJobList);

			if( isOk )
				return Ok("Add Advertisement");

			return BadRequest("Employer Advertisement is working");

		}



		[HttpPost("RemoveAdvertisement")]
		public async Task<ActionResult> RemoveAdvertisement([FromBody] IdRequest idRequest)
		{
			var isOk = await _employerServices.RemoveAdvertisement(idRequest);
			if( isOk )
				return Ok("Advertisement deleted");
			return BadRequest();
		}



		[HttpPost("UpdateAdvertisement")]
		public async Task<ActionResult> UpdateAdvertisement( [FromBody] EmployerJobListDto employerJobList)
		{
			Console.WriteLine("popoppopopoppopopoop");
			Console.WriteLine("popoppopopoppopopoop");
			Console.WriteLine("popoppopopoppopopoop");
			Console.WriteLine("popoppopopoppopopoop");
			Console.WriteLine("popoppopopoppopopoop");
			Console.WriteLine("popoppopopoppopopoop");
			var isOk = await _employerServices.UpdateAdvertisement(employerJobList);
			if( isOk )
				return Ok("Update EmployerJobListDto");
			return BadRequest("Update Not EmployerJobListDto");
		}



		[HttpPut("{OldPassword}/{NewPassword}/ChangePassword")]
		public async Task<ActionResult?> ChangePassword([FromRoute] string OldPassword, [FromRoute] string NewPassword)
		{
			var check = await _employerServices.ChangePassword(OldPassword, NewPassword);

			if( check )
				return Ok();
			return BadRequest();


		}


		[HttpPost("ToApplyAdvertisement")]
		public ActionResult ToApplyAdvertisement()
		{
			return Ok("Admin Controller is working");

		}

		//[AllowAnonymous]
		[HttpGet("GetAllAdvertisement")]
		public async Task<ActionResult<EmployerJobListDto>> GetAllAdvertisement()
		{

			var dto = await _employerServices.GetAllAdvertisement();
			return Ok(dto);

		}


		//[AllowAnonymous]
		[HttpPost("ChangeStatus")]
		public async Task<ActionResult> ChangeStatus([FromBody] StatusCodeDto statusCode)
		{
			var check = await _employerServices.ChangeStatus(statusCode);

			if( check )
				return Ok("Successful statuc code change");
			return BadRequest("Unsuccessful statuc code change");
		}


		//[AllowAnonymous]
		[HttpPost("ChangeBlock")]
		public async Task<ActionResult> ChangeBlock([FromBody] StatusCodeDto statusCode)
		{
			var isOk = await _employerServices.BlockUser(statusCode);
			if( isOk )
				return Ok("Successful statuc code change");
			return BadRequest("Unsuccessful statuc code change");
		}

		//[AllowAnonymous]
		[Authorize(Roles = "Worker, Employer")]
		[HttpPost("GetAdvertEmployerById")]
		public async Task<ActionResult<EmployerJobListDto>> GetAdvertEmployerById([FromBody] IdRequest idRequest)
		{
			if( idRequest == null )
			{
				return BadRequest("Id is NULL");

			}

			var emplist = await _employerServices.GetAdvertEmployerById(idRequest);
			if( emplist is not null )
				return Ok(emplist);
			return BadRequest("Advertisement not found id");

		}
	}
}
