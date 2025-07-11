using Microsoft.AspNetCore.Mvc;

namespace Job_Site.Pagination
{
	public class CollectionDtoQueryFilters
	{
		[FromQuery(Name = "Category Filter")]
		public string? Category { get; set; }

		[FromQuery(Name = "Section Filter")]
		public string? Section { get; set; }
	}
}
