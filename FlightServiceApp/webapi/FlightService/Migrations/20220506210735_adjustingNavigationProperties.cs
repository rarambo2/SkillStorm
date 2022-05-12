using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightService.Migrations
{
    public partial class adjustingNavigationProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_DepartureId",
                table: "Flights");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Airports_DepartureId",
                table: "Flights",
                column: "DepartureAirportId",
                principalTable: "Airports",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Airports_DepartureId",
                table: "Flights");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_DepartureId",
                table: "Flights",
                column: "DepartureAirportId",
                principalTable: "Airports",
                principalColumn: "Id");
        }
    }
}
