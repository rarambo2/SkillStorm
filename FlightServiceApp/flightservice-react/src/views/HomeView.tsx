import React from 'react';
import APIService from '../services/APIService'
import NavBar from "../components/navbar";
import Passenger from "../models/passenger"
import PassengerList from "../components/passenger/passengerlist";
import './App.css';


type HomeViewProps = {
    refreshHandler: (() => void;);
};

type HomeViewState = {
    allPassengers: Passenger[];
}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
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
        <div>
        <NavBar />
        <main role="main" className="container">
          <div className="App container">
            <h2>Passengers</h2>
            <PassengerList 
              passengers={this.state.allPassengers} 
              refreshHandler={this.handleListRefresh} />
          </div>
        </main>
        </div>
  
      );      
    }
  }





export default HomeView;