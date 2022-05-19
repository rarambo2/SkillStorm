import Flight, { xFlight } from "../models/flight"
import FlightDataService from "../services/flightService";
import { AppDispatch } from "../store";

// Constants
export const CREATE_FLIGHT: string = 'CREATE_FLIGHT'
export const UPDATE_FLIGHT: string = 'UPDATE_FLIGHT'
export const DELETE_FLIGHT: string = 'DELETE_FLIGHT'
const GET_FLIGHTS : string = 'GET_FLIGHTS'
const GET_FLIGHT : string = 'GET_FLIGHT'

// Actions

export const addFlight = (flight : xFlight) => async (dispatch:AppDispatch) => {
    try {
        const res = await FlightDataService.create(flight);
        dispatch({
            type: CREATE_FLIGHT,
            payload: res.data,
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

export function updateFlight(id: number, flight: xFlight){
    return {
        type: UPDATE_FLIGHT,
        payload: {id, flight}
    }
}

export function deleteFlight(id: number){
    return {
        type: DELETE_FLIGHT,
        payload: {id}
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
                    return { ...p, ...action.payload }
                } else{
                    return {...p};
                }
            })
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

