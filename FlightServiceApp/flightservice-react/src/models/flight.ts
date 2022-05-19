import xAirport from "./airport";

export interface xFlight {
    Id: number;
    FlightNumber: number;
    DepartureDate: Date;
    ArrivalDate: Date;
    DepartureAirportId: number;
    ArrivalAirportId: number;
    PassengerLimit: number;
}

interface Flight extends xFlight{
    ArrivalAirport: xAirport;
    DepartureAirport: xAirport;
}
export default Flight;

