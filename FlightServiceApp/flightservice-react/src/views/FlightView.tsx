import React from 'react';
import APIService from '../services/APIService'
import Passenger from "../models/passenger"
import PassengerList from "../components/passenger/passengerlist";


type HomeViewProps = {
};

type HomeViewState = {
    allPassengers: Passenger[];
}

class FlightView extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props:HomeViewProps){
        super(props)
        this.state = {allPassengers : []};
        this.handleListRefresh = this.handleListRefresh.bind(this);
      }
   
    componentDidMount(){
      this.handleListRefresh();
    }
  
    handleListRefresh(){
      console.log("handleListRefresh");
      APIService.getPassengers()
      .then((response) => {
        this.setState({
          allPassengers: response.data
        });
      })
      .catch((err: Error) => {
        console.log(err);
      })
    }
    render(){
      return (
          <div className="App container">
            <h2>Flights</h2>
            <PassengerList  />
          </div>
  
      );      
    }
  }





export default FlightView;