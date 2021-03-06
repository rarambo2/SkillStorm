using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FlightService.Library
{
    public partial class Booking
    {
        public Booking()
        {
            
        }
        public Booking(DTOBooking dbBooking)
        {
            Id = dbBooking.Id;
            PassengerId = dbBooking.PassengerId;
            FlightId = dbBooking.FlightId;
        }

        public int PassengerId { get; set; }
        public int FlightId { get; set; }
        public int Id { get; set; }
        [JsonIgnore]
        public virtual Flight Flight { get; set; } = null!;


        public virtual Passenger Passenger { get; set; } = null!;
    }
}
