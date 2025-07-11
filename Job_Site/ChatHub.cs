using Job_Site.Data;
using Job_Site.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;
using StackExchange.Redis;
using System.Collections.Concurrent;

namespace Job_Site
{
	public class ChatHub : Hub
	{

		private readonly IMemoryCache _memory;

		private readonly AppDbContext dbContext;

		public ChatHub(IMemoryCache memory, AppDbContext appDbContext)
		{
			_memory = memory;
			dbContext = appDbContext;
		}

		public async Task SendMessage(string receiverUserId, string role, string message)
		{
			var senderUserId = Context.UserIdentifier;
	
			var senderUserName = Context?.User?.Identity?.Name;

			var userid = await IsChechCache(receiverUserId, role);

			await Clients.User(senderUserId!).SendAsync("ReceiveMessage", senderUserId, role, senderUserName, message);


			if( !string.IsNullOrEmpty(userid) )
			{
				await Clients.User(userid).SendAsync("ReceiveMessage", senderUserId, role, senderUserName, message);
			}
		}


		public override async Task OnDisconnectedAsync(Exception exception)
		{
			var userId = Context.UserIdentifier;
			var connectionId = Context.ConnectionId;

			if( !string.IsNullOrEmpty(userId) )
			{
				if( _memory.TryGetValue(userId, out HashSet<string> connections) )
				{
					lock( connections )
					{
						connections.Remove(connectionId);

						if( connections.Count == 0 )
						{
							_memory.Remove(userId);
							Console.WriteLine($"User {userId} completely disconnected.");
						}
						else
						{
							_memory.Set(userId, connections);
							Console.WriteLine($"User {userId} disconnected one tab. Remaining: {connections.Count}");
						}
					}
				}
			}

			await base.OnDisconnectedAsync(exception);
		}

		public override async Task OnConnectedAsync()
		{
			var userId = Context.UserIdentifier;
			var connectionId = Context.ConnectionId;

			if( !string.IsNullOrEmpty(userId) )
			{
				var connections = _memory.GetOrCreate(userId, entry =>
				{
					entry.SlidingExpiration = TimeSpan.FromHours(1);
					return new HashSet<string>();
				});

				lock( connections )
				{
					connections.Add(connectionId);
				}

				_memory.Set(userId, connections); 

				Console.WriteLine($"User {userId} connected: {connectionId}");
			}

			await base.OnConnectedAsync();
		}


		private async Task<string> IsChechCache(string id, string role)
		{

			if( _memory.TryGetValue(id, out string result) )
			{
				return result;

			}


			else
			{
				if( role == "Worker" )
				{

					var user = await dbContext.Users.FirstOrDefaultAsync(i => i.Id.ToString() == id);

					if( user != null )
					{
						_memory.Set("myKey", user.Id, TimeSpan.FromMinutes(10));

						return user.Id.ToString();
					}

					if( user is null )
					{
						var employerjob = await dbContext.EmployerJobLists.FirstOrDefaultAsync(i => i.Id.ToString() == id);

						var employer = await dbContext.Employers.FirstOrDefaultAsync(i => i.Id == employerjob.EmployerId);

						var users = await dbContext.Users.FirstOrDefaultAsync(i => i.Id == employer.UserId);

						if( users != null )
						{
							_memory.Set("myKey", users.Id, TimeSpan.FromMinutes(10));

							return users.Id.ToString();
						}
					}
				}

				else if( role == "Employer" )
				{
					var user = await dbContext.Users.FirstOrDefaultAsync(i => i.Id.ToString() == id);

					if( user != null )
					{
						_memory.Set("myKey", user.Id, TimeSpan.FromMinutes(10));

						return user.Id.ToString();
					}

					if( user is null )
					{
						var workerjob = await dbContext.WorkerJobLists.FirstOrDefaultAsync(i => i.Id.ToString() == id);

						var worker = await dbContext.Workers.FirstOrDefaultAsync(i => i.Id == workerjob.WorkerId);

						var users = await dbContext.Users.FirstOrDefaultAsync(i => i.Id == worker.UserId);

						if( users != null )
						{
							_memory.Set("myKey", users.Id, TimeSpan.FromMinutes(10));

							return users.Id.ToString();
						}
					}
				}
				return "";


			}

		}


	}
}
