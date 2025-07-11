using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Job_Site.Migrations
{
    /// <inheritdoc />
    public partial class Mig_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "View_Count",
                table: "WorkerJobLists",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "View_Count",
                table: "EmployerJobLists",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "View_Count",
                table: "WorkerJobLists");

            migrationBuilder.DropColumn(
                name: "View_Count",
                table: "EmployerJobLists");
        }
    }
}
