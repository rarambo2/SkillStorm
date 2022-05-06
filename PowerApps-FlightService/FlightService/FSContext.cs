using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using FlightService.Library;

namespace FlightService
{
    public class FSContext : DbContext
    {
        public FSContext()
        {
        }

        public FSContext(DbContextOptions<FSContext> options) : base(options)
        {
        }


        public virtual DbSet<Airport> Airports { get; set; } = null!;
        public virtual DbSet<Booking> Bookings { get; set; } = null!;
        public virtual DbSet<Flight> Flights { get; set; } = null!;
        public virtual DbSet<Passenger> Passengers { get; set; } = null!;



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Airport>(entity =>
            {
                entity.Property(e => e.AirportName)
                    .HasColumnType("VARCHAR")
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.IATACode)
                    .HasColumnType("VARCHAR")
                    .HasMaxLength(4);
                entity.Property(e => e.Continent)
                    .HasColumnType("VARCHAR")
                    .HasMaxLength(10);
                entity.Property(e => e.Country)
                    .HasColumnType("VARCHAR")
                    .HasMaxLength(10);
                entity.Property(e => e.IsoRegion)
                    .HasColumnType("VARCHAR")
                    .HasMaxLength(10);
                entity.Property(e => e.Municipality)
                    .HasColumnType("VARCHAR")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasOne(d => d.Flight)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.FlightId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bookings_Flights");

                entity.HasOne(d => d.Passenger)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.PassengerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bookings_Passengers");
            });

            modelBuilder.Entity<Flight>(entity =>
            {
                entity.Property(e => e.ArrivalDate).HasColumnType("datetime");

                entity.Property(e => e.DepartureDate).HasColumnType("datetime");


                entity.HasOne(d => d.ArrivalAirport)
                    .WithMany(p => p.ArrivingFlights)
                    .HasForeignKey(d => d.ArrivalAirportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Flights_Airports_ArrivalId");

                entity.HasOne(d => d.DepartureAirport)
                    .WithMany(p => p.DepartingFlights)
                    .HasForeignKey(d => d.DepartureAirportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Flights_DepartureId");
            });

            modelBuilder.Entity<Passenger>(entity =>
            {
                entity.Property(e => e.Age).HasComment("Age of a Passenger");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email")
                    .HasComment("Passenger's email address");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasComment("First Name of a Passenger");

                entity.Property(e => e.Job)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasComment("Passenger's Occupation");

                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasComment("Passenger's Last Name");

            });
        }
    }
}
