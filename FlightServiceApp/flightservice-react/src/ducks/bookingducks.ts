import Passenger from "../models/passenger"
import BookingDataService from "../services/bookingService";
import { AppDispatch } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import Booking from "../models/booking";

// This is not specifically for bookings but for API calls that reference 
// the booking, flight and passenger tables for the UI


// Constants
export const GET_FLIGHT_PASSENGER_LIST = 'GET_FLIGHT_PASSENGER_LIST';
export const ADD_PASSENGER_TO_FLIGHT = 'ADD_PASSENGER_TO_FLIGHT';
export const ADD_BOOKING = 'ADD_BOOKING';
export const GET_BOOKINGS = 'GET_BOOKINGS';


// Actions

export const getBookings = () => async (dispatch: AppDispatch) => {
    try {
        console.log("getBookings()");
        const res = await BookingDataService.getAll();
        dispatch({
            type: GET_BOOKINGS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
}

export const getFlightPassengerList = (Id: number) => async (dispatch: AppDispatch) => {
    try {
        console.log("getFlightPassengerList");
        const res = await BookingDataService.getPassengersForFlight(Id);
        dispatch({
            type: GET_FLIGHT_PASSENGER_LIST,
            payload: {
                FlightId: Id,
                Passengers: res.data === undefined ? [] : res.data
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const addBooking = (PassengerId: number, FlightId: number) => async (dispatch: AppDispatch) => {
    try {
        console.log("addBooking");
        const booking = { PassengerId: PassengerId, FlightId: FlightId, Id: -1 }
        const res = await BookingDataService.createBooking(booking);
        dispatch({
            type: ADD_BOOKING,
            payload: {
                PassengerId: PassengerId,
                BookingId: res.data
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export type FlightPassengerManifestType = { [Id: number]: Passenger[] }
export type BookingsByPassengerIdType = { [Id: number]: Booking[] }
export type BookingsByFlightIdType = { [Id: number]: Booking[] }


export type BookingReducerStateType = {
    PassengerManifestsByFlightId: FlightPassengerManifestType
    BookingsByPassengerId: BookingsByPassengerIdType
    BookingsByFlightId: BookingsByFlightIdType
}


const initialState: BookingReducerStateType = {
    PassengerManifestsByFlightId: {},
    BookingsByPassengerId: {},
    BookingsByFlightId: {}
};

// Reducer

export default function bookingReducer(myState: BookingReducerStateType = initialState, action: AnyAction) {
    console.log(`PassengerReducer called with ${action.type}`);
    switch (action.type) {
        case GET_FLIGHT_PASSENGER_LIST: {
            let lastval = { ...(myState.PassengerManifestsByFlightId) };
            lastval[action.payload.FlightId as number] = action.payload.Passengers as Passenger[];
            let updateval = { PassengerManifestsByFlightId: lastval };
            let retval = { ...myState, ...updateval };
            return retval;
        }
        case ADD_BOOKING: {
            let b: Booking = action.payload;

            let lastval = { ...(myState.BookingsByPassengerId) };
            let existing = (lastval[b.PassengerId]).findIndex((m: Booking) => { return m.Id === b.Id; });
            if (existing === -1) {
                lastval[b.PassengerId].push(b);
            } else {
                let k: Booking = lastval[b.PassengerId][existing];
                let newval = { ...k, ...b }
                lastval[b.PassengerId][existing] = newval;
            }
            let lastval2 = { ...(myState.BookingsByFlightId) };
            let existing2: number = lastval2[b.FlightId].findIndex((m: Booking) => { return m.Id === b.Id });
            if (existing2 === -1) {
                lastval2[b.FlightId].push(b);
            } else {
                let k: Booking = lastval2[b.FlightId][existing];
                let newval = { ...k, ...b }
                lastval2[b.FlightId][existing2] = newval;
            }
            let updateval = {
                BookingsByPassengerId: lastval,
                BookingsByFlightId: lastval2
            };
            let retval = { ...myState, ...updateval };
            return retval;
        }
        case GET_BOOKINGS: {

            let bookings: Booking[] = action.payload;
            let byPassengerMap: BookingsByPassengerIdType = {};
            bookings.forEach((b: Booking) => {
                if (byPassengerMap[b.PassengerId] === undefined) {
                    byPassengerMap[b.PassengerId] = [b];
                } else {
                    byPassengerMap[b.PassengerId].push(b);
                }
            })
            let byFlightMap: BookingsByFlightIdType = {};
            bookings.forEach((b: Booking) => {
                if (byFlightMap[b.FlightId] === undefined) {
                    byFlightMap[b.FlightId] = [b];
                } else {
                    byFlightMap[b.FlightId].push(b);
                }

            })
            let updateval = {
                BookingsByPassengerId: byPassengerMap,
                BookingsByFlightId: byFlightMap
            }
            return { ...myState, ...updateval }
        }
        default:
            return myState;
    }
}
