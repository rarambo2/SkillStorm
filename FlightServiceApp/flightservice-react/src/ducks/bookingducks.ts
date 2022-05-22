import { PassengerWithBooking } from "../models/passenger"
import BookingDataService from "../services/bookingService";
import { AppDispatch } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import Booking from "../models/booking";

// This is not specifically for bookings but for API calls that reference 
// the booking, flight and passenger tables for the UI

var cloneDeep = require('lodash.clonedeep');

// Constants
export const GET_FLIGHT_PASSENGER_LIST = 'GET_FLIGHT_PASSENGER_LIST';
export const ADD_PASSENGER_TO_FLIGHT = 'ADD_PASSENGER_TO_FLIGHT';
export const ADD_BOOKING = 'ADD_BOOKING';
export const GET_BOOKINGS = 'GET_BOOKINGS';
export const DELETE_BOOKING = 'DELETE_BOOKING';


// Actions

export const getBookings = () => async (dispatch: AppDispatch) => {
    try {
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

export const removeBooking = (booking: Booking) => async (dispatch: AppDispatch) => {
    try {

        await BookingDataService.delete(booking.Id);
        dispatch({
            type: DELETE_BOOKING,
            payload: { ...booking }
        });
    } catch (err) {
        console.log(err);
    }    
}

export type FlightPassengerManifestType = { [Id: number]: PassengerWithBooking[] }
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
    switch (action.type) {
        case GET_FLIGHT_PASSENGER_LIST: {

            // My data is not quite right so I flub and remove booking ids that don't pertain to this flight
            // ideally I would do this before it comes from the database but my linq query wasn't working right
            // I wanted it to send me the passenger plus only the bookings that are for this specific flight id but 
            // it gives me ALL of them
            // It is important to clean this up before it gets saved to the state
            let myPassengers: PassengerWithBooking[] = action.payload.Passengers;
            let myFlightId:number = action.payload.FlightId;
            myPassengers.forEach((j:PassengerWithBooking)=> {
                // get my bookings list
                let list:Booking[] = j.Bookings;
                // clean up my bookings list and put it back.
                j.Bookings = list.filter((k:Booking) => {
                    if(k.FlightId != myFlightId ){
                        return false;
                    }else{
                        return true;
                    }
                })
            });

            let lastval = { ...(myState.PassengerManifestsByFlightId) };
            lastval[myFlightId] = myPassengers;
            let updateval = { PassengerManifestsByFlightId: lastval };
            let retval = { ...myState, ...updateval };
            return retval;
        }
        case ADD_BOOKING: {
            let b: Booking = action.payload;
            // copy the state
            let newState:BookingReducerStateType = cloneDeep(myState);
            let ByFlightId = newState.BookingsByFlightId
            let ByPassengerId = newState.BookingsByPassengerId;
            if (ByFlightId[b.FlightId] === undefined){
                ByFlightId[b.FlightId] = [b];
            }else{
                let existing = (ByFlightId[b.FlightId]).findIndex((m: Booking) => { return m.Id === b.Id; });
                 if (existing === -1) {
                    ByFlightId[b.FlightId].push(b);
                } else {
                    let k: Booking = ByFlightId[b.FlightId][existing];
                    let newval = { ...k, ...b }
                    ByFlightId[b.FlightId][existing] = newval;
                }
            }
            if (ByPassengerId[b.PassengerId] === undefined){
                ByPassengerId[b.PassengerId] = [b];
            }else{
                let existing = (ByPassengerId[b.PassengerId]).findIndex((m: Booking) => { return m.Id === b.Id; });
                 if (existing === -1) {
                    ByPassengerId[b.PassengerId].push(b);
                } else {
                    let k: Booking = ByPassengerId[b.PassengerId][existing];
                    let newval = { ...k, ...b }
                    ByPassengerId[b.PassengerId][existing] = newval;
                }
            }
            let updateval = {
                BookingsByPassengerId: ByPassengerId,
                BookingsByFlightId: ByFlightId
            };
            let retval = { ...newState, ...updateval };
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
        case DELETE_BOOKING:
            let b: Booking = action.payload;
            console.log("delete Booking");
            console.log(b);
            // copy the state
            let newState:BookingReducerStateType = cloneDeep(myState);
            let ByFlightId = newState.BookingsByFlightId[b.FlightId];
            newState.BookingsByFlightId[b.FlightId] = ByFlightId.filter((k:Booking)=>{
                if(k.Id === b.Id){
                    return false;
                }
                else{
                    return true;
                }
            });
            let ByPassengerId = newState.BookingsByPassengerId[b.PassengerId];
            newState.BookingsByPassengerId[b.PassengerId] = ByPassengerId.filter((k:Booking)=>{
                if(k.Id === b.Id){
                    return false;
                }
                else{
                    return true;
                }
            });
            return newState;                                   
        default:
            return myState;
    }
}
