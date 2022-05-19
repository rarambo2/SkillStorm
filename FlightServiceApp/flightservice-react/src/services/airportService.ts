import http from "../http-common";
import Airport from "../models/airport";

class AirportDataService {
    getAll(){
        return http.get("/Airports");
    }
    get(id : number) {
        return http.get(`/Airports/${id}`);
    }
    // create(airport : Airport) { //// NOT IMPLEMENTED RIGHT NOW
    // }
    update(airport : Airport) {
        console.log(`/Airports/${airport.Id}`);
        console.log(airport);
        return http.put(`/Airports/${airport.Id}`, airport);
    }
    delete(id : number) {
        console.log(`AirportDataService.delete ${id}`);
        return http.delete(`/Airports/${id}`);
    }

}


export default new AirportDataService();