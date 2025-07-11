using Microsoft.AspNetCore.Identity;

namespace Job_Site.Models
{
	public class User : IdentityUser<Guid>
	{
		public string? Surname { get; set; }
		public string? Age { get; set; }
		public DateTimeOffset CreatedAt { get; set; }
		public DateTimeOffset? UpdatedAt { get; set; }
		public DateTimeOffset? DeletedAt { get; set; }
		public string? Role { get; set; }
		public string? Gender { get; set; }
		public string? VerificationCode { get; set; }	
		public bool IsBloocked { get; set; }
		public string? RefreshToken { get; set; }
		public string? ProfileImagePath { get; set; }
	}
}

