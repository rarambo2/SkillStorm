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

namespace FlightService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly FSContext _context;

        public PassengersController(FSContext context)
        {
            _context = context;
        }

        // GET: api/Passengers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengers()
        {
            return await _context.Passengers.ToListAsync();
        }

        // GET: api/Passengers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passenger>> GetPassenger(int id)
        {
            var passenger = await _context.Passengers.FindAsync(id);

            if (passenger == null)
            {
                return NotFound();
            }

            return passenger;
        }
        // GET: api/Passengers/Booked
        [HttpGet("{id}/Booked/")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengerWithBookings(int id)
        {
            // we are actually getting passed a flight id, not a passenger or booking id.

            return await _context.Bookings.Where(x => x.FlightId == id)
                .Include(y => y.Passenger).Select(x => x.Passenger).OrderBy(x => x.LastName).ToListAsync();
             
        }

        // PUT: api/Passengers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassenger(int id, Passenger passenger)
        {
            if (id != passenger.Id)
            {
                return BadRequest();
            }

            _context.Entry(passenger).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerExists(id))
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

        // POST: api/Passengers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passenger>> PostPassenger(Passenger passenger)
        {
            _context.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassenger", new { id = passenger.Id }, passenger);
        }

        // DELETE: api/Passengers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            var passenger = await _context.Passengers.Include(x => x.Bookings).SingleAsync(x => x.Id == id);
            if (passenger == null)
            {
                return NotFound();
            }
            _context.Bookings.RemoveRange(passenger.Bookings);
            _context.Passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassengerExists(int id)
        {
            return _context.Passengers.Any(e => e.Id == id);
        }
    }
}
