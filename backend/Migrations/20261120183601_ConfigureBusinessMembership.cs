using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureBusinessMembership : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BusinessMemberships_BusinessId_UserId",
                table: "BusinessMemberships",
                columns: new[] { "BusinessId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BusinessMemberships_UserId",
                table: "BusinessMemberships",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessMemberships_AspNetUsers_UserId",
                table: "BusinessMemberships",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BusinessMemberships_Businesses_BusinessId",
                table: "BusinessMemberships",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusinessMemberships_AspNetUsers_UserId",
                table: "BusinessMemberships");

            migrationBuilder.DropForeignKey(
                name: "FK_BusinessMemberships_Businesses_BusinessId",
                table: "BusinessMemberships");

            migrationBuilder.DropIndex(
                name: "IX_BusinessMemberships_BusinessId_UserId",
                table: "BusinessMemberships");

            migrationBuilder.DropIndex(
                name: "IX_BusinessMemberships_UserId",
                table: "BusinessMemberships");
        }
    }
}
