import Flight from "../models/flight"
//import FlightDataService from "../services/FlightService";

// Constants
const CREATE_FLIGHT: string = 'CREATE_FLIGHT'
const UPDATE_FLIGHT: string = 'UPDATE_FLIGHT'
const DELETE_FLIGHT: string = 'DELETE_FLIGHT'
const SEARCH_FLIGHT: string = 'SEARCH_FLIGHT'

// Actions

// export const addFlight = (flight : Flight) => async (dispatch:AppDispatch) => {
//     try {
//         const res = await FlightDataService.create(Flight);
//         dispatch({
//             type: CREATE_FLIGHT,
//             payload: res.data,
//         });
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };
// export function addFLIGHT(FLIGHT : FLIGHT){
//     return {
//         type: CREATE_FLIGHT,
//         payload: {FLIGHT}
//     }
// }

export function updateFlight(id: number, flight: Flight){
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

export function searchFlight(filterText: string){
    return {
        type: SEARCH_FLIGHT,
        payload: {filterText}
    }
}

// Reducer

const initialState : Flight[] = [];

export default function FlightReducer(myState : Flight[] = initialState, action:any){
    switch(action.type){
        case CREATE_FLIGHT: {
            break;
        }
        case UPDATE_FLIGHT: {
            break;
        }

        case DELETE_FLIGHT: {
            break;
        }
        case SEARCH_FLIGHT: {
            break;
        }
        default:
            return myState;
    }
}
