import { AnyAction } from "@reduxjs/toolkit";
import { DELETE_PASSENGER, UPDATE_PASSENGER, CREATE_PASSENGER } from "./passengerducks";
import { DELETE_FLIGHT, UPDATE_FLIGHT, CREATE_FLIGHT } from "./flightducks";
import Passenger from "../models/passenger";



// Constants
const SEARCH_PASSENGER: string = 'SEARCH_PASSENGER'
const SELECT_PASSENGER: string = 'SELECT_PASSENGER'
const UNSELECT_PASSENGER: string = 'UNSELECT_PASSENGER'
const RESET_UI: string = 'RESET_UI'
const OPEN_ADD_PASSENGER_FORM: string = 'OPEN_ADD_PASSENGER_FORM'
const SEARCH_FLIGHT: string = 'SEARCH_FLIGHT'
const SELECT_FLIGHT: string = 'SELECT_FLIGHT'
const UNSELECT_FLIGHT: string = 'UNSELECT_FLIGHT'
const OPEN_ADD_FLIGHT_FORM: string = 'OPEN_ADD_FLIGHT-FORM'
const SHOW_PASSENGER_LIST: string = 'SHOW_PASSENGER_LIST'
const HIDE_PASSENGER_LIST: string = 'HIDE_PASSENGER_LIST'



// Actions

export const SearchPassenger = (filterText: string) => {
    console.log("SearchPassenger");
    console.log(filterText);
    return ({
        type: SEARCH_PASSENGER,
        payload: {filterText}});
}

export const selectPassenger = (selectedPassenger: number) => {
    return ({
        type: SELECT_PASSENGER,
        payload: {selectedPassenger}});
}

export const unselectPassenger = () =>{
    console.log("unselectPassenger");
        return ({
            type: UNSELECT_PASSENGER,
            payload: {undefined}
        });
}

export const resetUI = () => {
        return ({
            type:   RESET_UI,
            payload: {}
        });
}

export const showAddPassengerForm = () => {
    return ({
                type: OPEN_ADD_PASSENGER_FORM,
                payload: {}
    });
}

export const showAddFlightForm = () => {
    return ({
                type: OPEN_ADD_FLIGHT_FORM,
                payload: {}
    });
}
export const SearchFlight = (flightFilterText: string) => {
    return ({
        type: SEARCH_FLIGHT,
        payload: {flightFilterText}});
}

export const selectFlight = (selectedFlight: number) => {
    return ({
        type: SELECT_FLIGHT,
        payload: {selectedFlight}});
}
export const unselectFlight = () =>{
        return ({
            type: UNSELECT_FLIGHT,
            payload: {undefined}
        });
}
export const showPassengerList = () => {
    return ({
        type: SHOW_PASSENGER_LIST,
        payload: {}});
}
export const hidePassengerList = () => {
    return ({
        type: HIDE_PASSENGER_LIST,
        payload: {}});
}


// Reducer

export type uiReducerStateType = {
    filterText : string
    selectedPassenger : number | undefined
    addPassengerFormVisible : boolean
    selectedFlight : number | undefined
    flightFilterText : ""
    addFlightFormVisible : boolean
    showPassengerList : boolean
    currentFlightList : Passenger[]
}




const initialState : uiReducerStateType = {
    filterText : "",
    selectedPassenger : undefined,
    addPassengerFormVisible : false,
    selectedFlight : undefined,
    flightFilterText : "",
    addFlightFormVisible : false,
    showPassengerList : false,
    currentFlightList : []
};

export default function uiReducer(myState: uiReducerStateType | undefined = initialState, action:AnyAction) {
 console.log(`uiReducer: ${action.type}`);
    switch(action.type){
        case SEARCH_PASSENGER: {
            let updatevals = { filterText : action.payload.filterText }
            return { ...myState, ...updatevals};
        }
        case SELECT_PASSENGER: {
            let updatevals = {
                addPassengerFormVisible : false,
                selectedPassenger : action.payload.selectedPassenger
            }
            return { ...myState, ...updatevals }
        }
        case OPEN_ADD_PASSENGER_FORM:{
            let updatevals = { addPassengerFormVisible : true,
                                selectPassenger : undefined
                            }
            return { ...myState, ...updatevals }
        }
        case UPDATE_PASSENGER:
        case CREATE_PASSENGER:
        case UNSELECT_PASSENGER: {
            let updatevals = { addPassengerFormVisible : false,
                                selectedPassenger: undefined,
                                showItinerary: false,
                                showFlightPicker: false}
            return { ...myState, ...updatevals }
        }
        case SEARCH_FLIGHT: {
            let updatevals = {flightFilterText : action.payload.flightFilterText};
            return { ...myState, ...updatevals};
        }
        case SELECT_FLIGHT: {
            let updatevals = {
                addFlightFormVisible : false,
                selectedFlight : action.payload.selectedFlight
            }
            return { ...myState, ...updatevals }
        }
        case OPEN_ADD_FLIGHT_FORM:{
            let updatevals = { addFlightFormVisible : true,
                                showPassengerList : false,
                                selectedFlight : undefined

                            }
            return { ...myState, ...updatevals }

        }
        case HIDE_PASSENGER_LIST:{
            let updatevals = { showPassengerList : false }
            return { ...myState, ...updatevals }
        }
        case SHOW_PASSENGER_LIST:{
            let updatevals = { showPassengerList : true }
            return { ...myState, ...updatevals }
        }
        case UPDATE_FLIGHT:
        case CREATE_FLIGHT:
        case UNSELECT_FLIGHT: {
            let updatevals = { addFlightFormVisible : false,
                                selectedFlight: undefined,
                                showPassengerList : false
            }
            return { ...myState, ...updatevals }
        }        
        case DELETE_FLIGHT:
        case DELETE_PASSENGER:
        case RESET_UI: {
            return { ...initialState};
        }
        default:
            return myState;
    }
}
