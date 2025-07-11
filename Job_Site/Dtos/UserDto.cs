namespace Job_Site.Dtos
{
	public class UserDto
	{
		public Guid Id { get; set; }
		public string? UserName { get; set; }
		public string? SurName { get; set; }
		public string? Age { get; set; }
		public bool IsBloocked { get; set; }
		public string? ProfileImagePath { get; set; }


	}
}
