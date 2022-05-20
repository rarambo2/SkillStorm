import Passenger from '../models/passenger';
import axios from "axios";


const http = axios.create({
    baseURL: "https://localhost:7072",
    headers: {
        'Content-Type': 'application/json'
    }
});

const getPassengers = () => {
    return http.get<Array<Passenger>>("/api/Passengers");
};

const getPassenger = (id: number) => {
    return http.get<Passenger>(`api/Passengers/${id}`);
}

const createPassenger = (passenger: Passenger) => {
    console.log("createPassenger");
    let returnval = http.post<Passenger>("api/Passengers", passenger);
    console.log(returnval);
    return returnval;
};

const updatePassenger = (passenger: Passenger) => {
    console.log("createPassenger");
    let returnval = http.put<Passenger>(`api/Passengers/${passenger.Id}`, passenger);
    return returnval;
};

const deletePassenger = (id: number) => {
    return http.delete<Passenger>(`api/Passengers/${id}`);
};

const APIService = {
    getPassengers,
    getPassenger,
    createPassenger,
    updatePassenger,
    deletePassenger
};

export default APIService;