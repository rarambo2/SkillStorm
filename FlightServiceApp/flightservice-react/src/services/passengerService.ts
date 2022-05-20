import http from "../http-common";
import Passenger from "../models/passenger";

class PassengerDataService {
    getAll(){
        return http.get("/Passengers");
    }
    get(id : number) {
        return http.get(`/Passengers/${id}`);
    }
    create(passenger : Passenger) {
        // omitted Id since database will assign one.
        let newPass = {
            FirstName : passenger.FirstName,
            LastName : passenger.LastName,
            Age : passenger.Age,
            Email : passenger.Email,
            Job : passenger.Job
        }
        return http.post("/Passengers", newPass);
    }
    update(passenger : Passenger) {
        return http.put(`/Passengers/${passenger.Id}`, passenger);
    }
    delete(id : number) {
        return http.delete(`/Passengers/${id}`);
    }
    getPassengersForFlight(id : number) {
        return http.get(`/Passengers/${id}/booked`)
    }
}


export default new PassengerDataService();