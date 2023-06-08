using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InMeal.Core.Migrations
{
    public partial class Alter_Recipe_AddEnumColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CourseType",
                table: "Recipe",
                type: "longtext",
                nullable: false,
                defaultValue: "Unknown")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "MealType",
                table: "Recipe",
                type: "longtext",
                nullable: false,
                defaultValue: "Unknown")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseType",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "MealType",
                table: "Recipe");
        }
    }
}
