#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightService;
using FlightService.Library;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FlightService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly FSContext _context;

        public FlightsController(FSContext context)
        {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            return await _context.Flights.ToListAsync();
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };
            var flight = await _context.Flights
                .Include(f => f.ArrivalAirport)
                .Include(f => f.DepartureAirport).FirstAsync(f => f.Id == id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }
        // GET: api/Flights/5/Passenger
        [HttpGet("{id}/Passenger")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetPassengerFlights(int id)
        {
            var flights = _context.Flights
                .Join(_context.Bookings.Where(x => x.PassengerId == id),
                x => x.Id, y => y.FlightId, (x, y) => x)
                .Include(x => x.ArrivalAirport)
                .Include(x => x.DepartureAirport);

            return await flights.ToListAsync<Flight>(); ;   
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, Flight flight)
        {
            if (id != flight.Id)
            {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(Flight flight)
        {
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { id = flight.Id }, flight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.Id == id);
        }
    }
}
