namespace Job_Site.Models.Categorys
{
	public class EmployerCategorySection
	{
		public Guid id { get; set; }
		public string? Section { get; set; }
		public EmployerCategory? EmployerCategory { get; set; }
		public Guid EmployerCategoryId { get; set; }


	}
}
