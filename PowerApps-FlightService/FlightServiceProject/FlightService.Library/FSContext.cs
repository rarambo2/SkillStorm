using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FlightService.Library
{
    public partial class FSContext : DbContext
    {
        public FSContext()
        {
        }

        public FSContext(DbContextOptions<FSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Airport> Airports { get; set; } = null!;
        public virtual DbSet<Booking> Bookings { get; set; } = null!;
        public virtual DbSet<Flight> Flights { get; set; } = null!;
        public virtual DbSet<Passenger> Passengers { get; set; } = null!;

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Data Source=CALLISTO;Initial Catalog=FlightService;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Airport>(entity =>
            {
                entity.Property(e => e.AirportName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
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
                    .WithMany(p => p.Flights)
                    .HasForeignKey(d => d.ArrivalAirportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Flights_Airports");
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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
