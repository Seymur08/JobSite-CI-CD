﻿namespace Job_Site.Dtos
{
	public class PasswordChangeDto
	{
		public string? email { get; set; }
		public string? oldPassword { get; set; }
		public string? newPassword { get; set; }
	}	
}
