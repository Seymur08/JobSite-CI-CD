using ASP_.NET_WEP_API_JWT.Auth;
using FluentValidation;
using FluentValidation.AspNetCore;
using Job_Site;
using Job_Site.Data;
using Job_Site.Models;
using Job_Site.Services;
using Job_Site.Services.Interfaces;
using Job_Site.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;
using System.Text;




Log.Logger = new LoggerConfiguration()
	.MinimumLevel.Debug() // development üçün
	.Enrich.FromLogContext()
	.WriteTo.Console(
		outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}",
		theme: AnsiConsoleTheme.Code // Rəngli log
	)
	.WriteTo.File(
		"Logs/log-.txt",
		rollingInterval: RollingInterval.Day,
		retainedFileCountLimit: 7, // Son 7 günün logu
		fileSizeLimitBytes: 10_000_000, // 10MB fayl limiti
		rollOnFileSizeLimit: true
	)
	.CreateLogger();


var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();


builder.Services.AddScoped<IAdminServices, AdminService>();

builder.Services.AddScoped<IEmployerServices, EmployerService>();

builder.Services.AddScoped<IworkerService, WorkerService>();
builder.Services.AddScoped<IPasswordServices, PasswordService>();
builder.Services.AddScoped<IHomeServices, HomeService>();
builder.Services.AddSingleton<IUserIdProvider, UserIdProvider>();


builder.Services.AddHttpContextAccessor();

builder.Services.AddMemoryCache();


builder.Host.UseSerilog();
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// builder.Services.AddDbContext<AppDbContext>(options =>

// options.UseSqlServer(builder.Configuration.GetConnectionString("DBContext")));
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddIdentity<User, IdentityRole<Guid>>()
	.AddEntityFrameworkStores<AppDbContext>()
	.AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigin",
		builder => builder.WithOrigins("http://localhost:5173")  // Frontend-in URL'sini əlavə edin
						 .AllowAnyMethod()
						 .AllowAnyHeader()
						 .AllowCredentials()); // Cookie-ləri dəstəkləyir

});


builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo
	{
		Title = "JWTToken_Auth_API",
		Version = "v1"
	});
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
	{
		Name = "Authorization",
		Type = SecuritySchemeType.ApiKey,
		Scheme = "Bearer",
		BearerFormat = "JWT",
		In = ParameterLocation.Header,
		Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n" +
		" Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
	});
	c.AddSecurityRequirement(new OpenApiSecurityRequirement {
		{
			new OpenApiSecurityScheme {
				Reference = new OpenApiReference {
					Type = ReferenceType.SecurityScheme,
						Id = "Bearer"
				}
			},
			new string[] {}
		}
	});
});


var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
	options.Cookie.Name = "RefreshToken";
	options.LoginPath = "/Login";
})
.AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ClockSkew = TimeSpan.Zero,
		ValidateIssuerSigningKey = true,
		ValidIssuer = jwtSettings["Issuer"],
		ValidAudience = jwtSettings["Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(key),
	};

	// SignalR üçün token-i query string-dən oxu
	options.Events = new JwtBearerEvents
	{
		OnMessageReceived = context =>
		{
			var accessToken = context.Request.Query["access_token"];
			var path = context.HttpContext.Request.Path;

			if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chatHub"))
			{
				context.Token = accessToken;
			}

			return Task.CompletedTask;
		}
	};
});

builder.Services.Configure<FormOptions>(op =>
{
	op.MultipartBoundaryLengthLimit = 52428800;
});


builder.Services.AddControllers(config =>
{
	var policy = new AuthorizationPolicyBuilder()
		.RequireAuthenticatedUser()
		.Build();

	//config.Filters.Add(new AuthorizeFilter(policy)); // BUNU əlavə etmisənsə, AllowAnonymous işləməyəcək
});

builder.Services.AddFluentValidationAutoValidation(); // Automatik validation üçün
builder.Services.AddValidatorsFromAssemblyContaining<RegisterReguestDtoValidator>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<AuthenticationService>();

builder.Services.AddSignalR();




var app = builder.Build();


app.UseCors("AllowSpecificOrigin"); ///////     cors ucun

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseAuthentication(); // bunu authorization-dan əvvəl yaz
app.UseAuthorization();


app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

//app.UseEndpoints(endpoints =>
//{
//	endpoints.MapControllers();
//	endpoints.MapHub<ChatHub>("/chatHub"); // Burada Hub üçün endpoint
//});


app.Run();
