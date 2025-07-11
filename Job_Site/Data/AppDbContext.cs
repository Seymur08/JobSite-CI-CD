using Job_Site.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Job_Site.Models.Announcement;
using Job_Site.Models.Complaints;
using Job_Site.Models.Categorys;
using StackExchange.Redis;
using System.Numerics;
using System.Reflection;
//using Job_Site.Models.Complaints;kkkkk

namespace Job_Site.Data
{
	public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
	{

		//public  DbSet<Admin> Admins { get; set; }
		public new DbSet<User> Users { get; set; }
		public DbSet<Worker> Workers { get; set; }
		public DbSet<Employer> Employers { get; set; }
		public DbSet<WorkerJobList> WorkerJobLists { get; set; }
		public DbSet<EmployerJobList> EmployerJobLists { get; set; }

		public DbSet<WorkerCategory> WorkerCategories { get; set; }

		public DbSet<EmployerCategory> EmployerCategories { get; set; }

		//public DbSet<Complaint> Complaints { get; set; }

		public DbSet<WorkerComplaint> workerComplaints { get; set; }

		public DbSet<EmployerComplaint> employerComplaints { get; set; }
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			//modelBuilder.Entity<EmployerCategory>()
			//	.HasMany(e => e.Section)
			//	.WithOne(s => s.EmployerCategory)
			//	.HasForeignKey(s => s.EmployerCategoryId)
			//	.OnDelete(DeleteBehavior.Restrict);  // Silinmə davranışını tənzimləyin

			//modelBuilder.Entity<WorkerCategory>()
			//	.HasMany(w => w.Section)
			//	.WithOne(s => s.WorkerCategory)
			//	.HasForeignKey(s => s.WorkerCategoryId)
			//	.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<EmployerCategory>()
				.HasMany(e => e.Section)
				.WithOne(s => s.EmployerCategory)
				.HasForeignKey(s => s.EmployerCategoryId)
				.OnDelete(DeleteBehavior.Restrict);

			// WorkerCategory - WorkerCategorySection əlaqəsi
			modelBuilder.Entity<WorkerCategory>()
				.HasMany(w => w.Section)
				.WithOne(s => s.WorkerCategory)
				.HasForeignKey(s => s.WorkerCategoryId)
				.OnDelete(DeleteBehavior.Restrict);

			//modelBuilder.Entity<Admin>()
			//	.HasOne(a => a.User)
			//	.WithMany()
			//	.HasForeignKey(a => a.UserId)
			//	.OnDelete(DeleteBehavior.Cascade);

			//modelBuilder.Entity<CategoryNames>()
			//  .HasMany(c => c.SubCategories)
			//  .WithOne(sc => sc.categoryNames)
			//  .HasForeignKey(sc => sc.CategoryNamesId);

			modelBuilder.Entity<Worker>()
				.HasOne(w => w.User)
				.WithMany()
				.HasForeignKey(w => w.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Employer>()
				.HasOne(e => e.User)
				.WithMany()
				.HasForeignKey(e => e.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<WorkerJobList>()
				.HasOne(wj => wj.worker)
				.WithMany(w => w.workerJobLists)
				.HasForeignKey(wj => wj.WorkerId)
				.OnDelete(DeleteBehavior.SetNull);

			modelBuilder.Entity<EmployerJobList>()
				.HasOne(ej => ej.employer)
				.WithMany(e => e.employerJobLists)
				.HasForeignKey(ej => ej.EmployerId)
				.OnDelete(DeleteBehavior.SetNull);

			modelBuilder.Entity<WorkerComplaint>()
				.HasOne(c => c.Worker)
				.WithMany(w => w.workerComplaints)
				.HasForeignKey(c => c.WorkerId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<EmployerComplaint>()
				.HasOne(c => c.Employer)
				.WithMany(e => e.employerComplaints)
				.HasForeignKey(c => c.EmployerId)
				.OnDelete(DeleteBehavior.Cascade);

		}
	}


}



