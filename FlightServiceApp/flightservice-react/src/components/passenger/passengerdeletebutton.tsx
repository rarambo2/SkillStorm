import React, { Component } from "react";
import APIService from "../../services/APIService";


type PassengerDeleteButtonProps = {
    pId: number;
    refreshHandler: (() => void);
  }
  
  type PassengerDeleteButtonState = {
  }
  
  class PassengerDeleteButton extends Component<PassengerDeleteButtonProps, PassengerDeleteButtonState> {

    render() {

        return (
            <button type="button" 
            onClick={() => this.handleDeleteRowChange()} 
            className="btn btn-danger">X</button>
        );
    
    }

    handleDeleteRowChange(){
        APIService.deletePassenger(this.props.pId)
        .then((response) => {
            this.props.refreshHandler();
            return(<></>);
        }).catch((err) => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
        });
    }
  }

export default PassengerDeleteButton;