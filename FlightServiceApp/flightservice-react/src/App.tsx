import React from 'react';
import PassengerList from "./components/passenger/passengerlist";
import NavBar from "./components/navbar";
import './App.css';
import APIService from './services/APIService';
import Passenger from './models/passenger';
import Homeview from './views/HomeView';

type AppProps = {

};

type AppState = {
  allPassengers: Passenger[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props:AppProps){
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



export default App;
