namespace Job_Site.Dtos
{
	public class RegisterReguestDto
	{
		public string? UserName { get; set; }
		public string? SurName { get; set; }
		public string? Email { get; set; }
		public string? Password { get; set; }
		public string? Gender { get; set; }
		public string? Age { get; set; }
		public string? Phone { get; set; }
		public string? Role { get; set; }
		public IFormFile? ProfileImagePath { get; set; }

	}
}

