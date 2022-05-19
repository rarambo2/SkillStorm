import React from 'react';
import NavBar from "./components/navbar";
import './App.css';
import HomeView from './views/HomeView';
import FlightView from './views/FlightView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {connect} from "react-redux";
import {getPassengers} from "./ducks/passengerducks";
import {getFlights} from "./ducks/flightducks";
import {getAirports} from "./ducks/airportducks";
import {AppDispatch} from "./store";



type AppState = {
}

class App extends React.Component<any, AppState> {
  render(){
    return (
      <>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/home" element={<HomeView />} />
              <Route path="/flight" element={<FlightView />} />
            </Routes>
          </BrowserRouter>
        <main role="main" className="container">
        </main>
      </>
    );      
  }
  componentDidMount(){
    // load API Data
    this.props.getPassengers();
    this.props.getFlights();
    this.props.getAirports();

  }
}


const mapDispatchToProps = (dispatch:AppDispatch) => {
  return {
    getPassengers: () => dispatch(getPassengers()),
    getFlights: () => dispatch(getFlights()),
    getAirports: () => dispatch(getAirports())
  }
}

export default connect(null, mapDispatchToProps)(App);
