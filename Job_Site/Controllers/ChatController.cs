using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Job_Site.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ChatController : ControllerBase
	{

		private readonly IHubContext<ChatHub> _hubContext;

		public ChatController(IHubContext<ChatHub> hubContext)
		{
			_hubContext = hubContext;
		}

		[HttpPost("SendMessage")]
		public async Task<IActionResult> SendMessage([FromBody] ChatMessage message)
		{
			await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.UserId, message.Text);
			return Ok(new { Status = "Message Sent" });
		}
	}

	public class ChatMessage
	{
		public string UserId { get; set; }
		public string Text { get; set; }
	}

}

