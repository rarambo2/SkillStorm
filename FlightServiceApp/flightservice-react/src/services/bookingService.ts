import http from "../http-common";
import Booking from "../models/booking";

class BookingDataService {
    getAll() {
        return http.get("/Bookings");
    }
    createBooking(b: Booking) {
        return http.post(`/Bookings/`, { PassengerId: b.PassengerId, FlightId: b.FlightId });

    }
    getPassengersForFlight(id: number) {
        return http.get(`/Passengers/${id}/booked`)
    }
    delete(id: number){
        return http.delete(`/Bookings/${id}/`);
    }

}

export default new BookingDataService();