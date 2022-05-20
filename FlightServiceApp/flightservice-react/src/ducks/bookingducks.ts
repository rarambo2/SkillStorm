import Passenger from "../models/passenger"
import PassengerDataService from "../services/passengerService";
import { AppDispatch } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store"
import Booking from "../models/booking";

// This is not specifically for bookings but for API calls that reference 
// the booking, flight and passenger tables for the UI


// Constants
export const GET_FLIGHT_PASSENGER_LIST = 'GET_FLIGHT_PASSENGER_LIST';
export const ADD_PASSENGER_TO_FLIGHT = 'ADD_PASSENGER_TO_FLIGHT';
export const ADD_BOOKING = 'ADD_BOOKING';


// Actions
export const getFlightPassengerList = (Id:number) => async (dispatch:AppDispatch) => {
    try {
        console.log("getFlightPassengerList");
        const res = await PassengerDataService.getPassengersForFlight(Id);
        dispatch({
            type: GET_FLIGHT_PASSENGER_LIST,
            payload: {FlightId : Id,
                Passengers : res.data === undefined?[]:res.data
                    }
        });
    } catch (err){
        console.log(err);
    }
}

export const addBooking = (PassengerId:number, FlightId:number) => async (dispatch:AppDispatch) => {
    try {
        console.log("addBooking");
        const booking = {PassengerId : PassengerId, FlightId : FlightId, Id : -1}
        const res = await PassengerDataService.createBooking(booking);
        dispatch({
            type: ADD_BOOKING, 
            payload:{PassengerId : PassengerId,
                BookingId : res.data
            }
        });
    } catch (err){
        console.log(err);
    }
}

export type FlightPassengerManifestType = {[Id : number]: Passenger[]}
export type BookingIdsByPassengerIdType = {[Id : number]: number}


export type BookingReducerStateType = {
    PassengerManifestsByFlightId : FlightPassengerManifestType
    BookingIdsByPassengerId : BookingIdsByPassengerIdType};



const initialState : BookingReducerStateType = {
    PassengerManifestsByFlightId : {},
    BookingIdsByPassengerId : {}
};

// Reducer

export default function bookingReducer(myState:BookingReducerStateType = initialState, action:AnyAction) {
    console.log(`PassengerReducer called with ${action.type}`);
    switch(action.type){
        case GET_FLIGHT_PASSENGER_LIST:{
            let lastval = { ...(myState.PassengerManifestsByFlightId)};
            lastval[action.payload.FlightId as number] = action.payload.Passengers as Passenger[];
            let updateval = { PassengerManifestsByFlightId : lastval };
            let retval = { ...myState, ...updateval };
             return retval;
        }
        case ADD_BOOKING:{
            let lastval = { ...(myState.BookingIdsByPassengerId)};
            lastval[action.payload.PassengerId as number] = action.payload.BookingId as number;
            let updateval = { BookingIdsByPassengerId : lastval };
            let retval = { ...myState, ...updateval };
             return retval;
        }
        default:
            return myState;
    }
}
