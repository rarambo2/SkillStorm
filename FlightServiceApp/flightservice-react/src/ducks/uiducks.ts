import { AnyAction } from "@reduxjs/toolkit";
import { DELETE_PASSENGER, UPDATE_PASSENGER, CREATE_PASSENGER } from "./passengerducks";


// Constants
const SEARCH_PASSENGER: string = 'SEARCH_PASSENGER'
const SELECT_PASSENGER: string = 'SELECT_PASSENGER'
const UNSELECT_PASSENGER: string = 'UNSELECT_PASSENGER'
const RESET_UI: string = 'RESET_UI'
const OPEN_ADD_PASSENGER_FORM: string = 'OPEN_ADD_PASSENGER_FORM'

// Actions

export const SearchPassenger = (filterText: string) => {

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

// Reducer
type uiReducerStateType = {
    filterText : string
    selectedPassenger : number | undefined
    addPassengerFormVisible : boolean
}

const initialState : uiReducerStateType = {
    filterText : "",
    selectedPassenger : undefined,
    addPassengerFormVisible : false
};

export default function uiReducer(myState: uiReducerStateType | undefined = initialState, action:AnyAction) {
 console.log(`uiReducer: ${action.type}`);
    switch(action.type){
        case SEARCH_PASSENGER: {
            var newState : uiReducerStateType = { ...myState };
            newState.filterText = action.payload.filterText;
            return newState;
        }
        case SELECT_PASSENGER: {
            var newState : uiReducerStateType = { ...myState };
            let updatevals = {
                addPassengerFormVisible : false,
                selectedPassenger : action.payload.selectedPassenger
            }
            return { ...myState, ...updatevals }
        }
        case OPEN_ADD_PASSENGER_FORM:{
            let updatevals = { addPassengerFormVisible : true }
            return { ...myState, ...updatevals }
        }
        case UPDATE_PASSENGER:
        case CREATE_PASSENGER:
        case UNSELECT_PASSENGER: {
            let updatevals = { addPassengerFormVisible : false,
                                selectedPassenger: undefined }
            return { ...myState, ...updatevals }
        }
        case DELETE_PASSENGER:
        case RESET_UI: {
            return { ...initialState};
        }
        default:
            return myState;
    }
}
