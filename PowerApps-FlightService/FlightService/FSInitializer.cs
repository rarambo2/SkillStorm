using Microsoft.EntityFrameworkCore;
using FlightService.Library;

namespace FlightService
{
    public static class FSInitializer
    {
        public static IEnumerable<Passenger> ReadPassengerCsvData()
        {
            List<Passenger> csvData = new();
            string fileDir = $"{Directory.GetCurrentDirectory()}\\TestData\\Passengers.csv";
            using StreamReader reader = new(fileDir);
            // skip the first row
            if (!reader.EndOfStream) Console.WriteLine(reader.ReadLine());
            while (!reader.EndOfStream)
            {
                string line = reader.ReadLine();
                string[] values = line.Split(',');
                //"First Name","Last Name","Age","Email","Occupation"
                csvData.Add(new Passenger { FirstName = values[0], LastName = values[1], Job = values[4], Email = values[3], Age = int.Parse(values[2]) });
            }

            return csvData;
        }
        public static IEnumerable<Airport> ReadAirportCsvData()
        {
            List<Airport> csvData = new();
            string fileDir = $"{Directory.GetCurrentDirectory()}\\TestData\\Airports.csv";
            using StreamReader reader = new(fileDir);
            // skip the first row
            if (!reader.EndOfStream) reader.ReadLine();
            while (!reader.EndOfStream)
            {
                string line = reader.ReadLine();
                string[] values = line.Split(',');
                if (values[13] != "" && values[8] == "US" && values[0] != "351404")
                    csvData.Add(new Airport { AirportName = values[3], 
                        IATACode = values[13],
                    LongitudeDeg = double.Parse(values[5]),
                    LatitudeDeg = double.Parse(values[4]),
                    Continent = values[7],
                    Country = values[8],
                    IsoRegion = values[9],
                    Municipality = values[10]});
            }

            return csvData;
        }
        public static void Initialize(IServiceProvider serviceProvider, bool UseTestData)
        {
            using FSContext context = new(serviceProvider.GetRequiredService<DbContextOptions<FSContext>>());
            {
                //context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                if (UseTestData)
                {
                    if (!context.Passengers.Any())
                    {
                        IEnumerable<Passenger> passengersToAdd = new List<Passenger>();
                        passengersToAdd = ReadPassengerCsvData();
                        context.AddRange(passengersToAdd);
                        context.SaveChanges();
                    }
                    if (!context.Airports.Any())
                    {
                        IEnumerable<Airport> airportsToAdd = new List<Airport>();
                        airportsToAdd = ReadAirportCsvData();
                        context.AddRange(airportsToAdd);
                        context.SaveChanges();
                    }
                    if (!context.Flights.Any())
                    {
                        List<Flight> flightsToAdd = new();
                        int maxId, minId, refId1 = 0, refId2 = 0;
                        var rand = new Random();
                        maxId = context.Airports.Max(e => e.Id);
                        minId = context.Airports.Min(e => e.Id);
                        // derive some random flights from the test data
                        for (int i = 0; i < 100; i++)
                        {

                            refId1 = rand.Next(minId, maxId);
                            refId2 = rand.Next(minId, maxId);
                            DateTime date1 = (DateTime.Now).AddDays(rand.Next(30)); // random date between now and a month from now.
                            // round the minutes up to the hour or the half hour
                            int minute = date1.Minute;
                            if (minute <= 30) minute *= -1;
                            else minute = 30 - minute;
                            date1 = date1.AddMinutes(minute);
                            date1 = date1.AddHours(rand.Next(24));
                            date1 = date1.AddSeconds(date1.Second * -1);
                            date1 = date1.AddMilliseconds(date1.Millisecond * -1);
                            // arrival date is derived from departure date
                            DateTime date2 = date1.AddHours(rand.Next(12));
                            Flight newflight = new()  { DepartureAirportId = refId1,
                                ArrivalAirportId = refId2, PassengerLimit = rand.Next(9, 525),
                                DepartureDate = date1, ArrivalDate = date2, FlightNumber = rand.Next(100,999)};
                            flightsToAdd.Add(newflight);
                        }
                        context.AddRange(flightsToAdd);
                        context.SaveChanges();

                    }
                    if (!context.Bookings.Any())
                    {
                        var rand = new Random();
                        List<Booking> bookingsToAdd = new();
                        int minId, maxId;
                        minId = context.Flights.Min(x => x.Id);
                        maxId = context.Flights.Max(x => x.Id);
                        // derive some random bookings from the passenger data
                        foreach (Passenger p in context.Passengers)
                        {
                            for (int i = 0; i < rand.Next(4); i++)
                            {
                                Booking booking = new() {FlightId = rand.Next(minId, maxId), PassengerId = p.Id };
                                bookingsToAdd.Add(booking);
                            }
                        }
                        context.AddRange(bookingsToAdd);
                        context.SaveChanges();

                    }

                }

  



        /*
         *  Aircraft                Passenger Capacity Type                 Range
         *  Airbus A380	            525	                Commercial Airline	8000 nm
            Airbus A320	            220	                Commercial Airline	3300 nm
            Boeing 727	            189	                Commercial Airline	2500 nm
            Boeing 787 “DreamLiner”	290	                Commercial Airline	8000 nm
            Boeing 777	            451	                Commercial Airline	6000 nm
            Boeing 747	            366	                Commercial Airline	8000 nm
            McDonnell Douglas MD-80	172	                Commercial Airline	2700 nm
            Cessna 172	            4	                Single Engine Personal	736 nm
            Cessna Citation XLS+	9	                Private Jet	        3701 nm
        */

            }
        }
    }
}
