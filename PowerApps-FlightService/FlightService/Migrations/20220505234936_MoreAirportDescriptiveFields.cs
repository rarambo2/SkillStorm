using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightService.Migrations
{
    public partial class MoreAirportDescriptiveFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Continent",
                table: "Airports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Airports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Elevation",
                table: "Airports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "IsoRegion",
                table: "Airports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "LatitudeDeg",
                table: "Airports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LongitudeDeg",
                table: "Airports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Municipality",
                table: "Airports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Continent",
                table: "Airports");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Airports");

            migrationBuilder.DropColumn(
                name: "Elevation",
                table: "Airports");

            migrationBuilder.DropColumn(
                name: "IsoRegion",
                table: "Airports");

            migrationBuilder.DropColumn(
                name: "LatitudeDeg",
                table: "Airports");

            migrationBuilder.DropColumn(
                name: "LongitudeDeg",
                table: "Airports");

            migrationBuilder.DropColumn(
                name: "Municipality",
                table: "Airports");
        }
    }
}
