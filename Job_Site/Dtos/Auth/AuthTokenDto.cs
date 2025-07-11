namespace ASP_.NET_WEP_API_JWT.DTOs.Auth
{
	public class AuthTokenDto
	{
		public string? Token { get; set; }
		public string? RefreshToken { get; set; }
		public string? Role { get; set; }
	}	
}
