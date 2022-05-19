import React from "react";
import PassengerSearchBar from "./passengersearchbar";
import PassengerTable from "./passengertable";

type PassengerListProps = {
}

type PassengerListState = {
  selectedPassenger: number|undefined;
}

class PassengerList extends React.Component <any, PassengerListState>{
  constructor(props:PassengerListProps){
    super(props);

    this.state = {
      selectedPassenger : undefined
    }
  }

  
  render() {
    return (
          <div className="container-fluid">
          <PassengerSearchBar />
          <PassengerTable />
          </div>
    );
  }
}


export default PassengerList;