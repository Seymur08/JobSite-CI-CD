﻿namespace Job_Site.Pagination
{
	public class PaginationListDto<T>
	{
		public IEnumerable<T> Items { get; }
		public PaginationMeta Meta { get; }
		public PaginationListDto(IEnumerable<T> items, PaginationMeta meta)
		{
			Items = items;
			Meta = meta;
		}

	}
}
