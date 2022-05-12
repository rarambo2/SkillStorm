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
    return http.get<Passenger>(`api/Passenger/${id}`);
}

const createPassenger = (passenger: Passenger) => {
    return http.post<Passenger>("api/Passenger", passenger);
};

const updatePassenger = (passenger: Passenger) => {
    return http.put<Passenger>(`api/Passenger/${passenger.Id}`, passenger);
};

const deletePassenger = (id: number) => {
    return http.delete<Passenger>(`api/Passenger/${id}`);
};

const APIService = {
    getPassengers,
    getPassenger,
    createPassenger,
    updatePassenger,
    deletePassenger
};

export default APIService;