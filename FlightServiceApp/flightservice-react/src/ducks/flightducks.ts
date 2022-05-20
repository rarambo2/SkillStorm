import Flight, { xFlight } from "../models/flight"
import FlightDataService from "../services/flightService";
import { AppDispatch } from "../store";
import Airport from "../models/airport";

// Constants
export const CREATE_FLIGHT: string = 'CREATE_FLIGHT'
export const UPDATE_FLIGHT: string = 'UPDATE_FLIGHT'
export const DELETE_FLIGHT: string = 'DELETE_FLIGHT'
const GET_FLIGHTS : string = 'GET_FLIGHTS'
const GET_FLIGHT : string = 'GET_FLIGHT'

// Actions

const FindAirportFromId = (Identifier:number, airports:Airport[]) : Airport => {
    let returnval:Airport = airports.reduce((a:Airport, b:any) => {
        if(a.Id === Identifier)return a;
        return b;
    });
    return returnval;
}

export const addFlight = (flight : xFlight, airports:Airport[]) => async (dispatch:AppDispatch) => {
    try {
        console.log("addFlight()");
        const res = await FlightDataService.create(flight);
            // we only have airport ids, not airports, if we don't find the airport
            // objects the ui will explode when it wants the airport names.
        let flightForState:Flight = { ...flight, 
            DepartureAirport : FindAirportFromId(flight.DepartureAirportId, airports),
            ArrivalAirport : FindAirportFromId(flight.ArrivalAirportId, airports)};
        dispatch({
            type: CREATE_FLIGHT,
            payload: flightForState,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getFlights = () => async (dispatch:AppDispatch) => {
    try {
        console.log("getFlights()");
        const res = await FlightDataService.getAll();
        dispatch({
            type: GET_FLIGHTS,
            payload: res.data
        });
        
    } catch (err){
        console.log(err);
    }
}

export const updateFlight = (id: number, flight: xFlight, airports:Airport[]) => async (dispatch:AppDispatch) => {
    // we only have airport ids, not airports, if we don't find the airport
    // objects the ui will explode when it wants the airport names.
    try{
        console.log("Update Flight()");
        const res = await FlightDataService.update(flight);
        let flightForState:Flight = { ...flight, 
            DepartureAirport : FindAirportFromId(flight.DepartureAirportId, airports),
            ArrivalAirport : FindAirportFromId(flight.ArrivalAirportId, airports)
        };
        console.log(flightForState);
        dispatch({
            type: UPDATE_FLIGHT,
            payload: { ...flightForState}});

    } catch (err){
        console.log(err);
    }
}

export const deleteFlight = (id: number) => async (dispatch:AppDispatch) => {
    try {
        await FlightDataService.delete(id);
        dispatch({
            type: DELETE_FLIGHT,
            payload: { id }
        });
    } catch (err) {
        console.log(err);
    }
}


// Reducer

const initialState : Flight[] = [];

export default function FlightReducer(flights : Flight[] = initialState, action:any){
    console.log(`FlightReducer called with ${action.type}`);
    switch(action.type){
        case CREATE_FLIGHT: {
            return[...flights, action.payload];
        }
        case UPDATE_FLIGHT: {
            let newList:Flight[] = flights.map((p) => { 
                if(p.Id === action.payload.Id){
                    console.log(`found paylod id ${action.payload.Id}`);
                    return { ...p, ...action.payload }
                } else{
                    return {...p};
                }
            })
            console.log("UPDATE_FLIGHT LIST")
            console.log(newList);
             return newList;
        }
        case GET_FLIGHTS:
            return action.payload;
        case GET_FLIGHT:
            return action.payload;
        case DELETE_FLIGHT: {
            return flights.filter(({Id}) => Id !== action.payload.id);
        }
        default:
            return flights;
    }
}

