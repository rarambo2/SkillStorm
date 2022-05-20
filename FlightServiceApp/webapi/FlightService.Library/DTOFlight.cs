using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightService.Library
{
    public class DTOFlight
    {

        public DTOFlight()
        { }
        public int FlightNumber { get; set; }
        public DateTime? DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public int DepartureAirportId { get; set; }
        public int ArrivalAirportId { get; set; }
        public int? PassengerLimit { get; set; }
        public int Id { get; set; }
    }
}
