using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlightService.Library
{
    public partial class Airport
    {
        public Airport()
        {
            ArrivingFlights = new HashSet<Flight>();
            DepartingFlights = new HashSet<Flight>();
        }

        public string AirportName { get; set; } = null!;
        public int Id { get; set; }

        public double LatitudeDeg { get; set; }

        public double LongitudeDeg { get; set; }

        public string IATACode { get; set; } = null!;

        public string Continent { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string IsoRegion { get; set; } = null!;

        public string Municipality { get; set; } = null!;


        public virtual ICollection<Flight> ArrivingFlights { get; set; }

        public virtual ICollection<Flight> DepartingFlights { get; set; }
    }
}
