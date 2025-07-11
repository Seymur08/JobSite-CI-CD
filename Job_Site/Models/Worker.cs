using Job_Site.Models.Announcement;
using Job_Site.Models.Complaints;

namespace Job_Site.Models
{
	public class Worker
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public User? User { get; set; }
		public List<WorkerJobList>? workerJobLists { get; set; }
		public List<WorkerComplaint>? workerComplaints { get; set; }

	}
}

