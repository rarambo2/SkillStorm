interface Flight {
    Id: number;
    FlightNumber: number;
    DepartureDate: Date;
    ArrivalDate: Date;
    DepartureAirportId: number;
    ArrivalAirportId: number;
    PassengerLimit: number;
}

export default Flight;