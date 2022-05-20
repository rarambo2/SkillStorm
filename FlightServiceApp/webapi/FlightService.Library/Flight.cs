using System;
using System.Collections.Generic;

namespace FlightService.Library
{
    public partial class Flight
    {
        public Flight()
        {
            Bookings = new HashSet<Booking>();
        }
        public Flight(DTOFlight dbFlight)
        {
            Id = dbFlight.Id;
            FlightNumber = dbFlight.FlightNumber;
            DepartureDate = dbFlight.DepartureDate;
            ArrivalDate = dbFlight.ArrivalDate;
            DepartureAirportId = dbFlight.DepartureAirportId;
            ArrivalAirportId = dbFlight.ArrivalAirportId;
            PassengerLimit = dbFlight.PassengerLimit;
        }
        public int FlightNumber { get; set; }
        public DateTime? DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public int DepartureAirportId { get; set; }
        public int ArrivalAirportId { get; set; }
        public int? PassengerLimit { get; set; }
        public int Id { get; set; }

        public virtual Airport ArrivalAirport { get; set; } = null!;

        public virtual Airport DepartureAirport { get; set; } = null!;
        public virtual ICollection<Booking> Bookings { get; set; } = null!;
    }
}
