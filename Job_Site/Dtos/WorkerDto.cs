using Job_Site.Models.Announcement;
using Job_Site.Models.Complaints;

namespace Job_Site.Dtos
{
	public class WorkerDto
	{
		public Guid Id { get; set; }
		public UserDto? UserDto { get; set; }
		public List<WorkerComplaint>? workerComplaints { get; set; }

	}
}
