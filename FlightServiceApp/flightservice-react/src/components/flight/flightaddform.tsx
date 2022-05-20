import { AppDispatch, RootState } from "../../store";
import Flight, { xFlight } from "../../models/flight";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { unselectFlight,  showPassengerList, hidePassengerList } from "../../ducks/uiducks";
import { updateFlight, addFlight } from "../../ducks/flightducks";
import AirportSelectMenu from "./airportselectmenu";
import DateTimePicker from "./datetimepicker";
import Airport from "../../models/airport";


export const FlightAddForm = (props:any)=>{

    const dispatch = useDispatch();
    const airports = useSelector((state:RootState) => state.airports);
    const addNewFlight = useSelector((state:RootState) => state.ui.addFlightFormVisible);
    const fid = useSelector((state:RootState) => state.ui.selectedFlight);
    let flight = useSelector((state:RootState) => (state.flights.filter((p:Flight) => p.Id === fid)).pop()) ?? undefined;
    const PassengerListVisible = useSelector((state:RootState) => state.ui.showPassengerList);
    let ButtonText = PassengerListVisible? "Hide Assigned Passengers" : "View Assigned Passengers" ;
    const [FlightId, setFlightId] = useState(flight === undefined? -1 : flight.Id);
    const [FlightNumber, setFlightNumber] = useState(flight === undefined? "" : flight.FlightNumber);
    const [DepartureAirportId, setDepartureAirportId] = useState(flight === undefined? "" : flight.DepartureAirportId);
    const [DepartureDate, setDepartureDate] = useState(flight === undefined? new Date() : flight.DepartureDate);
    const [ArrivalAirportId, setArrivalAirportId] = useState(flight === undefined? "" : flight.ArrivalAirportId);
    const [ArrivalDate, setArrivalDate] = useState(flight === undefined? new Date() : flight.ArrivalAirportDate);
    const [PassengerLimit, setPassengerLimit] = useState(flight === undefined? "" : flight.PassengerLimit);
    if(addNewFlight && FlightId !== -1)
    {
        setFlightId(-1);
        setFlightNumber("");
        setDepartureAirportId(-1);
        setDepartureDate(new Date());
        setArrivalAirportId(-1);
        setArrivalDate(new Date());
        setPassengerLimit("");

    }
    else if(!addNewFlight && flight != undefined &&  FlightId !== fid)
    {
        setFlightId(flight.Id);
        setFlightNumber(flight.FlightNumber);
        setDepartureAirportId(flight.DepartureAirportId);
        setDepartureDate(flight.DepartureDate);
        setArrivalAirportId(flight.ArrivalAirportId);
        setArrivalDate(flight.ArrivalDate);
        setPassengerLimit(flight.PassengerLimit);
    }
    var buttonText = <></>;
    if(!addNewFlight) {
        buttonText = <button type="button" className="btn btn-primary m-2" onClick={(e:any) => togglePassengerList(dispatch, PassengerListVisible, e)}>{ButtonText}</button>
    }  
    if(fid === undefined && !addNewFlight){
        return (<></>);
 
        
    } else {   
 
        let formStyleString = PassengerListVisible? "bg-info p-3" : "bg-info p-3  sticky-top"
        return(
            <form className={formStyleString} onSubmit={(e:any) => {handleSubmit({
                Id : FlightId,
                FlightNumber : FlightNumber==""?-1:FlightNumber,
                DepartureAirportId : DepartureAirportId==""? -1: DepartureAirportId,
                DepartureDate : DepartureDate==""?new Date():DepartureDate,
                ArrivalAirportId : ArrivalAirportId==""?-1:ArrivalAirportId,
                ArrivalDate : ArrivalDate==""?new Date():ArrivalDate,
                PassengerLimit: PassengerLimit==""?-1:PassengerLimit,    
            }, dispatch, addNewFlight, airports, e)}}>
            <h3> {addNewFlight?"New Flight":"Edit Flight"}</h3>
            <div className ="form-group">
                <label htmlFor="flightNumberField">Flight Number</label>
                <input required className="form-control" id="flightNumberField" value={FlightNumber} placeholder={FlightNumber} onChange = {
                    (e:any) => setFlightNumber(e.target.value)}/>
            </div>   
            <div className ="form-group">
                <label htmlFor="flightDepartureAirportField">Departure Airport</label>
                <AirportSelectMenu  value={DepartureAirportId} id="flightDepartureAirportField" handler={setDepartureAirportId} flightid={FlightId}/>
            </div>
            <div className ="form-group">
                <label htmlFor="flightDepartureDateField">Departure Date</label> 
                <DateTimePicker flightid={FlightId} selected={DepartureDate !== undefined?DepartureDate:new Date()} handler={setDepartureDate}/>
            </div>
            <div className ="form-group">
                <label htmlFor="flightArrivalAirportField">Arrival Airport</label>
                <AirportSelectMenu  value={ArrivalAirportId} id="flightArrivalAirportField" handler={setArrivalAirportId} flightid={FlightId}/>
            </div>
            <div className ="form-group">
                <label htmlFor="flightArrivalDateField">Arrival Date</label> 
                <DateTimePicker flightid={FlightId} selected={ArrivalDate !== undefined?ArrivalDate:new Date()} handler={setArrivalDate}/>
            </div>
            <div className="form-group">
                <label htmlFor="flightPassengerLimitField">PassengerLimit</label>
                <input required className="form-control" id="flightPassengerLimitField" value={PassengerLimit} placeholder={PassengerLimit} onChange = {
                    (e:any) => setPassengerLimit(e.target.value)}/>
            </div>
             <button type="reset" className="btn btn-primary m-2" onClick={(e:any) => handleCancel(dispatch,e)}>Cancel</button>
            <button type="submit" className="btn btn-primary m-2">Save</button>
            {buttonText}
            </form>
        );
    }
}

const togglePassengerList = (dispatch:AppDispatch, passengerListVisible: boolean, e:any) => {
    if(passengerListVisible){
        dispatch(hidePassengerList());
    }
    else{
        dispatch(showPassengerList());
    }
}

const handleCancel = (dispatch:AppDispatch, e:any) => {
    dispatch(unselectFlight());
}

const handleSubmit = (newFlight:xFlight, dispatch:AppDispatch, Create: boolean, airports:Airport[], e:any) => {
    e.preventDefault();
    // newFlight.FlightNumber.trim().slice(0,20);
    // newPass.LastName.trim().slice(0,20);
    // newPass.Email.trim().slice(0,50);
    // newPass.Job.trim().slice(0,30);
    if(Create){
        dispatch(addFlight(newFlight, airports));
    }
    else {
        dispatch(updateFlight(newFlight.Id, newFlight, airports));
    }
   
}



export default FlightAddForm;

