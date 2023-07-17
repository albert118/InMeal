using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InMeal.Core.Migrations
{
    public partial class Update_Recipe_Add_isArchivable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isArchived",
                table: "Recipe",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isArchived",
                table: "Recipe");
        }
    }
}
