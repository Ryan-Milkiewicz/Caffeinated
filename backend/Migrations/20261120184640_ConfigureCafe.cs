using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureCafe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Cafes_BusinessId",
                table: "Cafes",
                column: "BusinessId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cafes_Businesses_BusinessId",
                table: "Cafes",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cafes_Businesses_BusinessId",
                table: "Cafes");

            migrationBuilder.DropIndex(
                name: "IX_Cafes_BusinessId",
                table: "Cafes");
        }
    }
}
