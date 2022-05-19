import http from "../http-common";
import { xFlight } from "../models/flight";

class FlightDataService {
    getAll(){
        return http.get("/Flights");
    }
    get(id : number) {
        return http.get(`/Flights/${id}`);
    }
    create(flight : xFlight) {
        // omitted Id since database will assign one.
        let newFlight = {
            FlightNumber: flight.FlightNumber,
            DepartureDate: flight.DepartureDate,
            ArrivalDate: flight.ArrivalDate,
            DepartureAirportId: flight.DepartureAirportId,
            ArrivalAirportId: flight.ArrivalAirportId,
            PassengerLimit: flight.PassengerLimit       
        }
        return http.post("/Flights", newFlight);
    }
    update(flight : xFlight) {
        console.log(`/Flights/${flight.Id}`);
        console.log(flight);
        return http.put(`/Flights/${flight.Id}`, flight);
    }
    delete(id : number) {
        console.log(`FlightDataService.delete ${id}`);
        return http.delete(`/Flights/${id}`);
    }

}


export default new FlightDataService();