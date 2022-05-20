import http from "../http-common";
import { xFlight } from "../models/flight";

class FlightDataService {
    getAll() {
        return http.get("/Flights");
    }
    get(id: number) {
        return http.get(`/Flights/${id}`);
    }
    create(flight: xFlight) {
        // omitted Id since  database will assign one.
        console.log("Flight create");
        let newFlight = {
            FlightNumber: parseInt(flight.FlightNumber.toString()).toString(),
            DepartureDate: (new Date(flight.DepartureDate)).toJSON(),
            ArrivalDate: (new Date(flight.ArrivalDate)).toJSON(),
            DepartureAirportId: flight.DepartureAirportId,
            ArrivalAirportId: flight.ArrivalAirportId,
            PassengerLimit: parseInt(flight.PassengerLimit.toString()).toString()
        }
        console.log(newFlight);
        let retval = http.post("/Flights", newFlight);
        console.log(retval);
        return retval;
    }
    update(flight: xFlight) {
        let newFlight = {
            Id: flight.Id,
            FlightNumber: parseInt(flight.FlightNumber.toString()),
            DepartureDate: (new Date(flight.DepartureDate)).toJSON(),
            ArrivalDate: (new Date(flight.ArrivalDate)).toJSON(),
            DepartureAirportId: flight.DepartureAirportId,
            ArrivalAirportId: flight.ArrivalAirportId,
            PassengerLimit: parseInt(flight.PassengerLimit.toString())
        }
        console.log("flight update()")
        console.log(newFlight);
        let retval = http.put(`/Flights/${flight.Id}`, newFlight);
        console.log(retval);
        return http.put(`/Flights/${flight.Id}`, newFlight);
    }
    delete(id: number) {
        console.log(`FlightDataService.delete ${id}`);
        return http.delete(`/Flights/${id}`);
    }

}


export default new FlightDataService();