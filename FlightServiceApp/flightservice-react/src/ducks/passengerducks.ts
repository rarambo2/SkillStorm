import Passenger from "../models/passenger"
import PassengerDataService from "../services/passengerService";
import { AppDispatch } from "../store";
import { AnyAction, bindActionCreators } from "@reduxjs/toolkit";

// Constants
export const CREATE_PASSENGER: string = 'CREATE_PASSENGER'
export const UPDATE_PASSENGER: string = 'UPDATE_PASSENGER'
export const DELETE_PASSENGER: string = 'DELETE_PASSENGER'
export const GET_PASSENGERS: string = 'GET_PASSENGERS'
export const GET_PASSENGER: string = 'GET_PASSENGER'


// Actions
export const getPassengers = async (dispatch:AppDispatch) => {
    try {
        console.log("getPassengers()");
        const res = await PassengerDataService.getAll();
        dispatch({
            type: GET_PASSENGERS,
            payload: res.data
        });
        
    } catch (err){
        console.log(err);
    }
}
export const getPassenger = (id:number) => async (dispatch:AppDispatch) => {
    try {
        const res = await PassengerDataService.get(id);
        dispatch({
            type: GET_PASSENGER,
            payload: res.data
        });
    } catch (err){
        console.log(err);
    }
}

export const addPassenger = (passenger : Passenger) => async (dispatch:AppDispatch) => {
    try {
        const res = await PassengerDataService.create(passenger);
        dispatch({
            type: CREATE_PASSENGER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updatePassenger = (passenger : Passenger) => async(dispatch:AppDispatch) => {
    try {
        const res = await PassengerDataService.update(passenger);
        dispatch({
            type: UPDATE_PASSENGER,
            payload: { ...passenger }
        })
        return Promise.resolve(res.data);

    } catch(err) {
        return Promise.reject(err);
    }
}

export const deletePassenger = (id : number) => async(dispatch:AppDispatch) => {
    try {
        console.log(`deletePassenger: ${id}`);
        await PassengerDataService.delete(id);
        dispatch({
            type: DELETE_PASSENGER,
            payload: { id }
        });
    } catch (err) {
        console.log(err);
    }
}


// Reducer

const initialState : Passenger[] = [];

export default function passengerReducer(passengers : Passenger[] = initialState, action:AnyAction) {
    console.log(`PassengerReducer called with ${action.type}`);
    switch(action.type){
        case CREATE_PASSENGER: {
            return[...passengers, action.payload];
        }
        case UPDATE_PASSENGER: {
            let newList:Passenger[] = passengers.map((p) => { 
                if(p.Id === action.payload.Id){
                    return { ...p, ...action.payload }
                } else{
                    return {...p};
                }
            })
             return newList;
        }
        case GET_PASSENGERS:
            return action.payload;
        case GET_PASSENGER:
            return action.payload;
        case DELETE_PASSENGER: {
            return passengers.filter(({Id}) => Id !== action.payload.id);
        }
        default:
            return passengers;
    }
}
