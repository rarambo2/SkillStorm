import React from "react";
import { deletePassenger } from "../../ducks/passengerducks";
import { selectPassenger } from "../../ducks/uiducks";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux"

export const PassengerRow = (props:any) => {
    const passenger = props.passenger;
    const dispatch = useDispatch();
    let pId = `${passenger.Id}`;
    let highlightFormattingTags = "";
    if(props.selected){
      highlightFormattingTags = "text-light bg-info";
    }
    return (
      <React.Fragment key={passenger.Id} >
      <tr id={pId} className = {highlightFormattingTags} onClick={(e:any) => handleSelectPassenger(dispatch, passenger.Id, e)}>
        <td>{passenger.FirstName}</td>
        <td>{passenger.LastName}</td>
        <td>{passenger.Age}</td>
        <td>{passenger.Email}</td>
        <td>{passenger.Job}</td>
        <td><button type="button" 
        onClick={(e:any) => handleDeletePassenger(dispatch, passenger.Id, e)}
        className="btn btn-danger" title="Delete">X</button>
        </td>
      </tr>
      </React.Fragment>
    );

}
const handleSelectPassenger = (dispatch:AppDispatch, passId: number, e:any) => {
  dispatch(selectPassenger(passId));
}
const handleDeletePassenger = (dispatch:AppDispatch, passId: number, e:any) => {
  dispatch(deletePassenger(passId));
}

export default PassengerRow;