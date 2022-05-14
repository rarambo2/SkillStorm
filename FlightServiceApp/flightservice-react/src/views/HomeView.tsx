import React, { MouseEventHandler } from 'react';
import APIService from '../services/APIService'
import Passenger from "../models/passenger"
import PassengerList from "../components/passenger/passengerlist";



type HomeViewProps = {
};

type HomeViewState = {
    allPassengers: Passenger[];
}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props:HomeViewProps){
        super(props)
        this.state = {allPassengers : []};
        this.handleListRefresh = this.handleListRefresh.bind(this);
        this.handlePassengerSelect = this.handlePassengerSelect.bind(this);
      }
   
    componentDidMount(){
      this.handleListRefresh();
    }
  
    handleListRefresh(){
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

    handlePassengerSelect (pId: number){
        return 
    }

    render(){
      return (
          <div className="App container">
            <h2 className="display-1 p-3">Passengers</h2>
            <PassengerList 
              passengers={this.state.allPassengers} 
              refreshHandler={this.handleListRefresh} 
              />
          </div>
      );      
    }
  }





export default HomeView;