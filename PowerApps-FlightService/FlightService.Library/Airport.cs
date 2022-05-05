using System;
using System.Collections.Generic;

namespace FlightService.Library
{
    public partial class Airport
    {
        public Airport()
        {
            Flights = new HashSet<Flight>();
        }

        public string AirportName { get; set; } = null!;
        public int Id { get; set; }

        public virtual ICollection<Flight> Flights { get; set; }
    }
}
