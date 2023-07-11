using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InMeal.Core.Migrations
{
    public partial class CategoryId_nullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_RecipeCategory_CategoryId",
                table: "Recipe");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "Recipe",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_RecipeCategory_CategoryId",
                table: "Recipe",
                column: "CategoryId",
                principalTable: "RecipeCategory",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_RecipeCategory_CategoryId",
                table: "Recipe");
            
            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "Recipe",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_RecipeCategory_CategoryId",
                table: "Recipe",
                column: "CategoryId",
                principalTable: "RecipeCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
