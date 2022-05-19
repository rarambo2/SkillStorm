// import React from 'react';
// import APIService from '../services/APIService'
// import Passenger from "../models/passenger"
import PassengerList from "../components/passenger/passengerlist";
import PassengerAddForm from "../components/passenger/passengeraddform"; 
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { isFulfilled } from "@reduxjs/toolkit";


type HomeViewProps = {
};

type HomeViewState = {
    //allPassengers: Passenger[];
}

export const HomeView = (props:any) => {
    const passengerId = useSelector((state:RootState) => state.ui.selectedPassenger);
    const addPassengerFormVisible = useSelector((state:RootState) => state.ui.addPassengerFormVisible);
    if(passengerId === undefined){
        if(!addPassengerFormVisible){
            var containerDivClassName = "container-fluid";
            var listDivClassName = "container-fluid";
            var formDivClassName = "";
        }
        else {
            var containerDivClassName = "row justify-content-xl-left no-gutters p-1";
            var listDivClassName = "col-9";
            var formDivClassName = "col p-3 font-weight-normal";            
        }
    } 
    else {
        var containerDivClassName = "row justify-content-xl-left no-gutters p-1";
        var listDivClassName = "col-9";
        var formDivClassName = "col-3 font-weight-normal";
    }
      return (
          <div className="container-fluid" >
              <div className = {containerDivClassName}>
                  <div className="Jumbotron text-center"><h1  className="display-2">Passengers</h1></div>
                <div className={listDivClassName}>
                    <PassengerList />
                </div>
                <div className={formDivClassName}>
                    <PassengerAddForm />
                </div>

            </div>
        </div>
      );      
  }

export default HomeView;