namespace Job_Site.Models.Categorys
{
	public class EmployerCategory
	{
		public Guid Id { get; set; }
		public int Count { get; set; }
		public string? Category { get; set; }
		public List<EmployerCategorySection> Section { get; set; } = new();	
	}
}
