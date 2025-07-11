namespace Job_Site.Models.Complaints
{
	public class EmployerComplaint
	{
		public Guid Id { get; set; }
		public string? Reason { get; set; }
		public Guid EmployerId { get; set; }
		public Employer Employer { get; set; } = new();

	}
}
