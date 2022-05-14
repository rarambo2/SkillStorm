import React, { Component } from "react";
import PassengerRow from "./passengerrow";
//import { Passenger } from '../models';
import Passenger from "../../models/passenger";
import PassengerTableColumns from "./passengertablecolumns";

type PassengerTableProps = {
    filterText: string;
    passengers: Passenger[];
    refreshHandler: (() => void);
}

type PassengerTableState = {
}

class PassengerTable extends Component<PassengerTableProps, PassengerTableState> {
    render() {
      const filterText = this.props.filterText.toLowerCase();
      let filteredlist:Passenger[] = this.props.passengers.filter((p:Passenger) => {
        if(filterText == "" 
          || p.FirstName.toLowerCase().indexOf(filterText) !== -1 
          || p.LastName.toLowerCase().indexOf(filterText) !== -1){
            return true;
          }
          else{return false;}
      })
      return (
        <table className="table table-hover table-bordered">
          <thead>
            <PassengerTableColumns />
          </thead>
          <tbody>
              {filteredlist.map( (passenger:Passenger) => (
                <PassengerRow 
                  passenger={passenger} 
                  key = {passenger.Id} 
                  refreshHandler={this.props.refreshHandler}
                  
                  />
              ))}

          </tbody>
        </table>
      );
    };
  }

export default PassengerTable;