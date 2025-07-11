using Job_Site.Models;

namespace Job_Site.Dtos
{
	public class EmployerJobListDto
	{
		public Guid Id { get; set; }
		public string? Category { get; set; }
		public string? Section { get; set; }	
		public string? Phone { get; set; }
		public string? Email { get; set; }
		public string? Company { get; set; }
		public string? Work_experience { get; set; }
		public string? Contact_person { get; set; }
		public string? Work_time { get; set; }
		public string? Work_schedule { get; set; }
		public string? Requirements { get; set; }
		public string? Address { get; set; }
		public int? Salary_Min { get; set; }
		public int? Salary_Max { get; set; }
		public int? Age_Min { get; set; }
		public int? Age_Max { get; set; }
		public int View_Count { get; set; }
		public EmployerDto? employerDto { get; set; }	
		public DateTimeOffset CreatedAt { get; set; }
		public DateTimeOffset DeadlineAt { get; set; }
		public DateTimeOffset? UpdatedAt { get; set; }
		public DateTimeOffset? DeletedAt { get; set; }
		public Status status { get; set; }

	}
}


