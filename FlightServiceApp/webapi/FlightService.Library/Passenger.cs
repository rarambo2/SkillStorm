using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FlightService.Library
{
    public partial class Passenger
    {
        public Passenger()
        {
            Bookings = new HashSet<Booking>();
        }

        /// <summary>
        /// First Name of a Passenger
        /// </summary>
        public string FirstName { get; set; } = null!;
        /// <summary>
        /// Passenger&apos;s Last Name
        /// </summary>
        public string LastName { get; set; } = null!;
        /// <summary>
        /// Passenger&apos;s Occupation
        /// </summary>
        public string? Job { get; set; }
        /// <summary>
        /// Passenger&apos;s email address
        /// </summary>
        public string Email { get; set; } = null!;
        /// <summary>
        /// Age of a Passenger
        /// </summary>
        public int? Age { get; set; }
        public int Id { get; set; }
        
        public virtual ICollection<Booking> Bookings { get; set; } = null!;
    }
}
