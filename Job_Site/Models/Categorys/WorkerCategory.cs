namespace Job_Site.Models.Categorys
{
	public class WorkerCategory
	{
		public Guid Id { get; set; }
		public int Count { get; set; }
		public string? Category { get; set; }
		public List<WorkerCategorySection> Section { get; set; } = new();
	}
}
