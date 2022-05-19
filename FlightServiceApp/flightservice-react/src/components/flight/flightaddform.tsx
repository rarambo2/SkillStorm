import { AppDispatch, RootState } from "../../store";
import Flight, { xFlight } from "../../models/flight";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { unselectFlight } from "../../ducks/uiducks";
import { updateFlight, addFlight } from "../../ducks/flightducks";
import AirportSelectMenu from "./airportselectmenu";
import DateTimePicker from "./datetimepicker";

export const FlightAddForm = (props:any)=>{

    const dispatch = useDispatch();
    const addNewFlight = useSelector((state:RootState) => state.ui.addFlightFormVisible);
    const fid = useSelector((state:RootState) => state.ui.selectedFlight);
    const flight = useSelector((state:RootState) => (state.flights.filter((p:Flight) => p.Id == fid)).pop()) ?? undefined;
    const [FlightId, setFlightId] = useState(flight === undefined? "" : flight.Id);
    const [FlightNumber, setFlightNumber] = useState(flight === undefined? "" : flight.FlightNumber);
    const [DepartureAirportId, setDepartureAirportId] = useState(flight === undefined? "" : flight.DepartureAirportId);
    const [DepartureDate, setDepartureDate] = useState(flight === undefined? "" : flight.DepartureDate);
    const [ArrivalAirportId, setArrivalAirportId] = useState(flight === undefined? "" : flight.ArrivalAirportId);
    const [ArrivalDate, setArrivalDate] = useState(flight === undefined? "" : flight.ArrivalAirportDate);
    const [PassengerLimit, setPassengerLimit] = useState(flight === undefined? undefined : flight.PassengerLimit);
    const [Init, setInit] = useState(true);
    if(fid === undefined && !addNewFlight){
        return (<></>);
    } else {   
        if(addNewFlight){
            if(Init){
                // adding a new passenger form, clear all fields.
                const newFlight:xFlight = {
                    Id : -1,
                    FlightNumber: -1,
                    DepartureAirportId: -1,
                    DepartureDate: new Date(),
                    ArrivalAirportId: -1,
                    ArrivalDate: new Date(),
                    PassengerLimit: 10,
                }
                setFlightId(-1);
                setFlightNumber("");
                setDepartureAirportId("");
                setDepartureDate("");
                setArrivalAirportId("");
                setArrivalDate("");
                setPassengerLimit(10);
                setInit(false); //Done Clearing the Form, don't do it again.
            }
            return (
                <form className="bg-info p-3  sticky-top" onSubmit={(e:any) => {setInit(true); handleCreate({
                    Id : FlightId,
                    FlightNumber : FlightNumber,
                    DepartureAirportId : DepartureAirportId,
                    DepartureDate : DepartureDate,
                    ArrivalAirportId : ArrivalAirportId,
                    ArrivalDate : ArrivalDate,
                    PassengerLimit: PassengerLimit
                }, dispatch, e)}}>
                <h3> Add Flight </h3>
                <div className ="form-group">
                    <label htmlFor="flightNumberField">Flight Number</label>
                    <input required
                        type="number"
                     className="form-control" id="flightNumberField" value={FlightNumber} onChange = {
                        (e:any) => setFlightNumber(e.target.value)}/>
                </div>   
                <button type="reset" className="btn btn-primary m-2" onClick={(e:any) => handleCancel(dispatch,e)}>Cancel</button>
                <button type="submit" className="btn btn-primary m-2">Save</button>
                </form>
            );

       }

        if(flight.Id !== FlightId){
            setFlightId(flight.Id);
            setFlightNumber(flight.FlightNumber);
            setDepartureAirportId(flight.DepartureAirportId);
            setDepartureDate(flight.DepartureDate);
            setArrivalAirportId(flight.ArrivalAirportId);
            setArrivalDate(flight.ArrivalDate);
            setPassengerLimit(flight.PassengerLimit);
        }         
        return(

            <form className="bg-info p-3  sticky-top" onSubmit={(e:any) => {setInit(true); handleSubmit({
                Id : flight.Id,
                FlightNumber : FlightNumber,
                DepartureAirportId : DepartureAirportId,
                DepartureDate : DepartureDate,
                ArrivalAirportId : ArrivalAirportId,
                ArrivalDate : ArrivalDate,
                PassengerLimit: PassengerLimit
            }, dispatch, e)}}>
            <h3> Edit Flight </h3>
            <div className ="form-group">
                <label htmlFor="flightNumberField">Flight Number</label>
                <input required className="form-control" id="flightNumberField" value={FlightNumber} placeholder={FlightNumber} onChange = {
                    (e:any) => setFlightNumber(e.target.value)}/>
            </div>   
            <div className ="form-group">
                <label htmlFor="flightDepartureAirportField">Departure Airport</label>
                <AirportSelectMenu  value={DepartureAirportId} id="flightDepartureAirportField" tag="EditDepartureAirport"/>
            </div>
            <div className ="form-group">
                <label htmlFor="flightDepartureDateField">Departure Date</label> 
                <DateTimePicker flightid={FlightId} selected={DepartureDate !== undefined?DepartureDate:new Date()}/>
            </div>
            <div className ="form-group">
                <label htmlFor="flightArrivalAirportField">Arrival Airport</label>
                <AirportSelectMenu  value={ArrivalAirportId} id="flightArrivalAirportField" tag="EditArrivalAirport"/>
            </div>
            <div className ="form-group">
                <label htmlFor="flightArrivalDateField">Arrival Date</label> 
                <DateTimePicker flightid={FlightId} selected={ArrivalDate !== undefined?ArrivalDate:new Date()}/>
            </div>
            <div className="form-group">
                <label htmlFor="flightPassengerLimitField">PassengerLimit</label>
                <input required className="form-control" id="flightPassengerLimitField" value={PassengerLimit} placeholder={PassengerLimit} onChange = {
                    (e:any) => setPassengerLimit(e.target.value)}/>
            </div>
             <button type="reset" className="btn btn-primary m-2" onClick={(e:any) => handleCancel(dispatch,e)}>Cancel</button>
            <button type="submit" className="btn btn-primary m-2">Save</button>
            </form>
        );
    }
}

const handleCancel = (dispatch:AppDispatch, e:any) => {
    dispatch(unselectFlight());
}

const handleSubmit = (newFlight:xFlight, dispatch:AppDispatch, e:any) => {
    e.preventDefault();
    // newFlight.FlightNumber.trim().slice(0,20);
    // newPass.LastName.trim().slice(0,20);
    // newPass.Email.trim().slice(0,50);
    // newPass.Job.trim().slice(0,30);
    dispatch(updateFlight(newFlight.Id, newFlight));

}

const handleCreate = (newFlight:xFlight, dispatch:AppDispatch, e:any) => {
    e.preventDefault();
    // newPass.FirstName.trim().slice(0,20);
    // newPass.LastName.trim().slice(0,20);
    // newPass.Email.trim().slice(0,50);
    // newPass.Job.trim().slice(0,30);
    dispatch(addFlight(newFlight));

}


export default FlightAddForm;

