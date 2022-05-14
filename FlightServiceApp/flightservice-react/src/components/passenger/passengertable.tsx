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
    //   const filterText = this.props.filterText;
  
    //   const rows: Array<ReactElement<any, any>> = [];
    //   this.props.passengers.forEach((passenger: Passenger) => {
        // if(typeof passenger === undefined || typeof passenger.FirstName === undefined || typeof passenger.LastName === undefined){
        //     return;
        // }
        // else if (filterText != "" 
        //     && passenger.FirstName.indexOf(filterText) === -1 
        //     && passenger.LastName.indexOf(filterText) === -1) {
        //     return;
        // }
    //     rows.push(
    //       <PassengerRow
    //         passenger={passenger}
    //         key={passenger.Id}
    //       />
    //     );
    //   });
  
      return (
        <table className="table table-hover table-bordered">
          <thead>
            <PassengerTableColumns />
          </thead>
          <tbody>
              {this.props.passengers.map( (passenger:Passenger) => (
                <PassengerRow 
                  passenger={passenger} 
                  key = {passenger.Id} 
                  refreshHandler={this.props.refreshHandler}/>
              ))}

          </tbody>
        </table>
      );
    };
  }

export default PassengerTable;