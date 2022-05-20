import React from "react";
import { deleteFlight } from "../../ducks/flightducks";
import { selectFlight } from "../../ducks/uiducks";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux"

export const FlightRow = (props: any) => {
  const flight = props.flight;
  const dispatch = useDispatch();
  let pId = `${flight.Id}`;
  let highlightFormattingTags = "";
  if (props.selected) {
    highlightFormattingTags = "text-dark bg-white";
  }
  const departureairport = `(${flight.DepartureAirport.IATACode})${flight.DepartureAirport.AirportName}`;
  const arrivalairport = `(${flight.ArrivalAirport.IATACode})${flight.ArrivalAirport.AirportName}`;
  const dDate = new Date(flight.DepartureDate);
  const aDate = new Date(flight.ArrivalDate);
  return (
    <React.Fragment key={flight.Id} >
      <tr id={pId} className={highlightFormattingTags} onClick={(e: any) => handleSelectFlight(dispatch, flight.Id, e)}>
        <td>{flight.FlightNumber}</td>
        <td>
          <div className="no-gutters">
            <div className="row no-gutters">
              <div className="col-xl">{departureairport}</div>
              <div className="col-sm">{flight.DepartureAirport.Municipality}</div>
              <div className="col">{flight.DepartureAirport.IsoRegion}</div>
              <div className="col">{`${dDate.toLocaleDateString()} -- ${dDate.toLocaleTimeString()}`}</div>
            </div>

            <div className="row no-gutters">
              <div className="col-lg">{arrivalairport}</div>
              <div className="col-sm">{flight.ArrivalAirport.Municipality}</div>
              <div className="col">{flight.ArrivalAirport.IsoRegion}</div>
              <div className="col">{`${aDate.toLocaleDateString()} -- ${aDate.toLocaleTimeString()}`}</div>
            </div>

          </div>
        </td>
        <td><button type="button"
          onClick={(e: any) => handleDeleteFlight(dispatch, flight.Id, e)}
          className="btn btn-danger" title="Delete">X</button>
        </td>
      </tr>
    </React.Fragment>
  );

}
const handleSelectFlight = (dispatch: AppDispatch, flightId: number, e: any) => {
  dispatch(selectFlight(flightId));
}
const handleDeleteFlight = (dispatch: AppDispatch, flightId: number, e: any) => {
  let dialogText: string = "This will delete the flight.  Continue?";
  //stop bubbling
  e.stopPropagation();
  if (window.confirm(dialogText)) {
    dispatch(deleteFlight(flightId));
  }

}

export default FlightRow;