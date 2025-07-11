using Job_Site.Models.Announcement;
using Job_Site.Models.Complaints;

namespace Job_Site.Dtos
{
	public class EmployerDto
	{
		public Guid Id { get; set; }
		public UserDto? User { get; set; }
		public EmployerJobListDto? JobList { get; set; }	

	}
}
