using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureCoffee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roaster_Businesses_BusinessId",
                table: "Roaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roaster",
                table: "Roaster");

            migrationBuilder.RenameTable(
                name: "Roaster",
                newName: "Roasters");

            migrationBuilder.RenameIndex(
                name: "IX_Roaster_BusinessId",
                table: "Roasters",
                newName: "IX_Roasters_BusinessId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Roasters",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roasters",
                table: "Roasters",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Coffee",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RoasterId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    OriginCountry = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    OriginRegion = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Farm = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    Variety = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Process = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    RoastLevel = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coffee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Coffee_Roasters_RoasterId",
                        column: x => x.RoasterId,
                        principalTable: "Roasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coffee_RoasterId",
                table: "Coffee",
                column: "RoasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Roasters_Businesses_BusinessId",
                table: "Roasters",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roasters_Businesses_BusinessId",
                table: "Roasters");

            migrationBuilder.DropTable(
                name: "Coffee");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roasters",
                table: "Roasters");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Roasters");

            migrationBuilder.RenameTable(
                name: "Roasters",
                newName: "Roaster");

            migrationBuilder.RenameIndex(
                name: "IX_Roasters_BusinessId",
                table: "Roaster",
                newName: "IX_Roaster_BusinessId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roaster",
                table: "Roaster",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Roaster_Businesses_BusinessId",
                table: "Roaster",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
