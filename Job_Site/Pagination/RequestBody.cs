namespace Job_Site.Pagination
{
	public class RequestBody
	{
		public int page { get; set; } = 1;
		public int pagesize { get; set; } = 6;
		public string? category { get; set; } = string.Empty;
		public string? section { get; set; } = string.Empty;
		public string? city { get; set; } = string.Empty;
		public int? salary { get; set; }

	}
}
