import React, { MouseEventHandler, Component } from "react";
import Passenger from "../../models/passenger";
import PassengerDeleteButton from "./passengerdeletebutton";

type PassengerRowProps = {
  passenger: Passenger;
  refreshHandler: (() => void);

}

type PassengerRowState = {
  rowDeleted: boolean;
}



class PassengerRow extends Component<PassengerRowProps, PassengerRowState> {
    render() {
        const passenger = this.props.passenger;
        let pId = `${passenger.Id}`;
        return (
          <React.Fragment key={passenger.Id}>
          <tr id={pId} >
            <td>{passenger.FirstName}</td>
            <td>{passenger.LastName}</td>
            <td>{passenger.Age}</td>
            <td>{passenger.Email}</td>
            <td>{passenger.Job}</td>
            <td><PassengerDeleteButton 
              pId={passenger.Id} 
              refreshHandler={this.props.refreshHandler} /></td>
          </tr>
          </React.Fragment>
        );
    

    }

}

export default PassengerRow;