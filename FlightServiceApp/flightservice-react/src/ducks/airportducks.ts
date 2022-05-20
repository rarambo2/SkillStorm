import Airport from "../models/airport"
import AirportDataService from "../services/airportService";
import { AppDispatch } from "../store";

// Constants
export const CREATE_AIRPORT: string = 'CREATE_AIRPORT'
export const UPDATE_AIRPORT: string = 'UPDATE_AIRPORT'
export const DELETE_AIRPORT: string = 'DELETE_AIRPORT'
const GET_AIRPORTS: string = 'GET_AIRPORTS'
const GET_AIRPORT: string = 'GET_AIRPORT'

// Actions

export const getAirports = () => async (dispatch: AppDispatch) => {
    try {
        console.log("getAirports()");
        const res = await AirportDataService.getAll();
        dispatch({
            type: GET_AIRPORTS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
}

// export function updateAirport(id: number, airport: Airport){
//     return {
//         type: UPDATE_AIRPORT,
//         payload: {id, airport}
//     }
// }

// export function deleteAirport(id: number){
//     return {
//         type: DELETE_AIRPORT,
//         payload: {id}
//     }
// }

// Reducer

const initialState: Airport[] = [];

export default function AirportReducer(airports: Airport[] = initialState, action: any) {
    console.log(`AirportReducer called with ${action.type}`);
    switch (action.type) {
        case CREATE_AIRPORT: {
            return [...airports, action.payload];
        }
        case UPDATE_AIRPORT: {
            let newList: Airport[] = airports.map((p) => {
                if (p.Id === action.payload.Id) {
                    return { ...p, ...action.payload }
                } else {
                    return { ...p };
                }
            })
            return newList;
        }
        case GET_AIRPORTS:
            return action.payload;
        case GET_AIRPORT:
            return action.payload;
        case DELETE_AIRPORT: {
            return airports.filter(({ Id }) => Id !== action.payload.id);
        }
        default:
            return airports;
    }
}

