using Job_Site.Models.Announcement;
using Job_Site.Models.Complaints;

//using Job_Site.Models.Complaints;


namespace Job_Site.Models
{
	public class Employer
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public User? User { get; set; }
		public List<EmployerJobList>? employerJobLists { get; set; }
		public List<EmployerComplaint>? employerComplaints { get; set; }

	}

}
