import Passenger from "../models/passenger"
import PassengerDataService from "../services/passengerService";
import { AppDispatch } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store"

// This is not specifically for bookings but for API calls that reference 
// the booking, flight and passenger tables for the UI


// Constants
export const GET_FLIGHT_PASSENGER_LIST = 'GET_FLIGHT_PASSENGER_LIST';
export const ADD_PASSENGER_TO_FLIGHT = 'ADD_PASSENGER_TO_FLIGHT';


// Actions
export const getFlightPassengerList = (Id:number) => async (dispatch:AppDispatch) => {
    try {
        const res = await PassengerDataService.getPassengersForFlight(Id);
        dispatch({
            type: GET_FLIGHT_PASSENGER_LIST,
            payload: {FlightId : Id,
                Passengers : res.data
                    }
        });
        
    } catch (err){
        console.log(err);
    }
}

export type FlightPassengerManifestType = {[Id : number]: Passenger[]}


export type BookingReducerStateType = {
    PassengerManifestsByFlightId : FlightPassengerManifestType};



const initialState : BookingReducerStateType = {
    PassengerManifestsByFlightId : {}
};

// Reducer

export default function bookingReducer(myState:BookingReducerStateType = initialState, action:AnyAction) {
    console.log(`PassengerReducer called with ${action.typef}`);
    switch(action.type){
        case GET_FLIGHT_PASSENGER_LIST:{
            
            let lastval = { ...(myState.PassengerManifestsByFlightId)};
            lastval[action.payload.FlightId as number] = action.payload.passengers as Passenger[];
            let updateval = { PassengerManifestsByFlightId : lastval };
            return { ...myState, ...updateval };
        }

        default:
            return myState;
    }
}
