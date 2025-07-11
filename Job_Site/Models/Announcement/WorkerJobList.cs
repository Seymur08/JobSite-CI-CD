using Job_Site.Models.Categorys;

namespace Job_Site.Models.Announcement
{
	public class WorkerJobList
	{
		public Guid Id { get; set; }
		public Guid? WorkerId { get; set; }	
		public Worker? worker { get; set; }
		public string? Adress { get; set; }	
		public string? Phone { get; set; }	
		public string? Age { get; set; }
		public string? Email { get; set; }
		public string? Section { get; set; }
		public string? Category { get; set; }
		public string? Gender { get; set; }
		public string? WorkExperience { get; set; }
		public string? Education { get; set; }
		public string? Detailed { get; set; }
		public int? Salary { get; set; }
		public int View_Count { get; set; } = 0;
		public DateTimeOffset CreatedAt { get; set; }
		public DateTimeOffset DeadlineAt { get; set; }
		public DateTimeOffset? UpdatedAt { get; set; }
		public DateTimeOffset? DeletedAt { get; set; }
		public Status status { get; set; } = Status.Waiting;

	}
}
