using Microsoft.AspNetCore.Identity;

namespace Job_Site.Models
{
	public class Admin
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public User? User { get; set; }

	}
}



//public DateTimeOffset CreatedAt { get; set; }
//public DateTimeOffset UpdatedAt { get; set; }
//public DateTimeOffset DeletedAt { get; set; }


//public Guid Id{get; set;}
//public string? Name{get; set;}
//public string? SurName{get; set;}
//public string? Age{get; set;}
//public string? Gender{get; set;}
//public string? Email{get; set;}
//public string? Password{get; set;}	
//public string? Phone{get; set;}
