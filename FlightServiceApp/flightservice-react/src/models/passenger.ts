import Booking from "./booking";

interface Passenger {
    Id: number;
    FirstName: string;
    LastName: string;
    Job: string;
    Email: string;
    Age: number;
}


// variant for the flight list to keep the booking id intact

export interface PassengerWithBooking extends Passenger{
    Bookings: Booking[]

}

export default Passenger;

