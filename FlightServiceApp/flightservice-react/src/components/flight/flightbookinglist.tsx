import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import Flight from "../../models/flight";
import { getFlightPassengerList, addBooking } from "../../ducks/bookingducks";
import { useEffect} from "react";
import Passenger from "../../models/passenger";
import  React, { useState } from "react";
import Form  from "react-bootstrap/Form";

type FlightBookingListProps = {
}

const loadPassengerData = (dispatch:AppDispatch, selectedFlight:number) =>{
    console.log("loadPassengerData");
    if(selectedFlight !== undefined){
        dispatch(getFlightPassengerList(selectedFlight));
    }
}

const FlightBookingList = (props: FlightBookingListProps): JSX.Element => {
    const [selectedPassenger, setSelectedPassenger] = useState(-1);
    const flights = useSelector((state:RootState) => state.flights);
    const selectedFlight = useSelector((state:RootState) => state.ui.selectedFlight);
    const showPassengerList = useSelector((state:RootState) => state.ui.showPassengerList);
    const passengers = useSelector((state:RootState) => state.passengers);
    const dispatch = useDispatch();
    const myFlight = selectedFlight as number;
    useEffect(() => loadPassengerData(dispatch, selectedFlight), [myFlight]);
   const flightManifests = useSelector((state:RootState) => state.bookings.PassengerManifestsByFlightId);

   if(!showPassengerList || !selectedFlight)return (<></>);
    const flightManifest : Passenger[] = flightManifests[myFlight];
    let currentFlight:Flight = flights.reduce((f:Flight, b:any)=>{
        if(f.Id == selectedFlight)return f;
        else return b;
    }) 
    var passengerlist:JSX.Element[] = [];
    var numberOfPassengers:number = 0;
    if(flightManifest !== undefined){
        numberOfPassengers = flightManifest.length;
        passengerlist = flightManifest.map((p : Passenger)=>{return(
        <React.Fragment key={p.Id}>
            <tr key={p.Id}><td>{`${currentFlight.FlightNumber}-${p.Id}${selectedFlight}`}</td>
            <td >{`${p.LastName}, ${p.FirstName}`}</td>
            </tr>
        </React.Fragment>)})
    }
    var selectlist:JSX.Element[] = [];
    if(passengers !== undefined){
        selectlist = passengers.map((p : Passenger) => {return(
                <option key={p.Id} value={p.Id}>{`${p.LastName}, ${p.FirstName}`}</option>
        )})
    }
    var buttonText = <></>;
    if(currentFlight.PassengerLimit - numberOfPassengers > 0){
        buttonText = <button type="submit" className="btn btn-primary m-2">Add</button>
    }else{
        buttonText = <><button type="submit" className="btn btn-primary m-2" disabled>Add</button>
        <small className="text-danger">This flight is full!</small></>
    }

    return (
        <div className="container-fluid border-info border sticky-top bg-info bg-opacity-25">
        <h5 className = "mt-3 mb-3">{`Passengers on Flight: ${currentFlight.FlightNumber}-${selectedFlight}`}</h5>
        <div>
            <h6 ><small className="text-muted"></small>{currentFlight.PassengerLimit - numberOfPassengers} Seats Remaining<small></small></h6>
            <table className="table p-1">
                <thead>
                    <tr>
                        <th scope="col">Reservation</th><th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                        { passengerlist }
                </tbody>
            </table>


        </div>
        <h4 className = "mt-3 mb-3">Add Passengers</h4>
            <form className="p-3" onSubmit={(e:any) => handleAddPassenger(selectedFlight, selectedPassenger, dispatch, e)}>
            <Form.Select required className="custom-select" onChange={(e:any) => setSelectedPassenger(parseInt(e.target.value))}
                defaultValue={selectedPassenger === undefined? "" : selectedPassenger}>
                {selectlist}
            </Form.Select>
            {buttonText}
            </form>
        </div>
                    
    );
};

const handleAddPassenger = (myFlight:number, myPassenger:number, dispatch:AppDispatch, e:any) => {
    e.preventDefault();
    dispatch(addBooking(myPassenger, myFlight));
    dispatch(getFlightPassengerList(myFlight));
}

export default FlightBookingList;