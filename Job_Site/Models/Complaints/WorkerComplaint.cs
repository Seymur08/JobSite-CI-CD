namespace Job_Site.Models.Complaints
{
	public class WorkerComplaint
	{

		public Guid Id { get; set; }
		public string? Reason { get; set; }
		public Guid WorkerId { get; set; }
		public Worker Worker { get; set; } = new();



	}
}
