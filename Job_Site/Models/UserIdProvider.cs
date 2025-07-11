using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Job_Site.Models
{
	public class UserIdProvider : IUserIdProvider
	{
		public string? GetUserId(HubConnectionContext connection)
		{
			Console.WriteLine(connection);
			Console.WriteLine(connection);
			Console.WriteLine(connection);
			Console.WriteLine(connection);

			var user =  connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			Console.WriteLine(" id");
			Console.WriteLine(user);
			Console.WriteLine(user);
			Console.WriteLine("id");
			return user;
		}
	}
}
