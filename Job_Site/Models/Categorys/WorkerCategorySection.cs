namespace Job_Site.Models.Categorys
{
	public class WorkerCategorySection
	{
		public Guid id { get; set; }	
		public string? Section { get; set; }
		public WorkerCategory? WorkerCategory { get; set; }
		public Guid WorkerCategoryId { get; set; }
	}
}
