import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import Flight from "../../models/flight";
import { getFlightPassengerList, addBooking, removeBooking } from "../../ducks/bookingducks";
import { useEffect } from "react";
import Passenger, { PassengerWithBooking } from "../../models/passenger";
import React, { useState } from "react";
import Booking from "../../models/booking";
import PassengerSelectList from "./passengerselectlist";
import { filterPassengerPicker } from "../../ducks/uiducks";

type FlightBookingListProps = {
}

const loadPassengerData = (dispatch: AppDispatch, selectedFlight: number) => {
    if (selectedFlight !== undefined) {
        dispatch(getFlightPassengerList(selectedFlight));
    }
}

const FlightBookingList = (props: FlightBookingListProps): JSX.Element => {
    const [selectedPassenger, setSelectedPassenger] = useState(-1);
    const passengerFilter = useSelector((state: RootState) => state.ui.filterPassengerPicker);
    const flights = useSelector((state: RootState) => state.flights);
    const selectedFlight = useSelector((state: RootState) => state.ui.selectedFlight);
    const showPassengerList = useSelector((state: RootState) => state.ui.showPassengerList);
    const dispatch = useDispatch();
    const myFlight = selectedFlight as number;
    useEffect(() => loadPassengerData(dispatch, selectedFlight), [selectedFlight, dispatch]);
    const flightManifests = useSelector((state: RootState) => state.bookings.PassengerManifestsByFlightId);

    if (!showPassengerList || selectedFlight === undefined) return (<></>);
    const flightManifest: PassengerWithBooking[] = flightManifests[myFlight];
    let currentFlight: Flight = flights.reduce((f: Flight, b: any) => {
        if (f.Id === selectedFlight) return f;
        else return b;
    })
    var passengerlist: JSX.Element[] = [];
    var numberOfPassengers: number = 0;
    let idval:number = -1;
        // some passengers have more than one booking.  Keep track
        // of which booking ID to print with a given passenger.
    let passengerMap = new Map();
    if (flightManifest !== undefined) {
        numberOfPassengers = flightManifest.length;
        let miniListOfQueues: { [key: number]: number[] } = {};
        passengerlist = flightManifest.map((p: PassengerWithBooking) => {
        if(passengerMap.has(p.Id)){
            idval = passengerMap.get(p.Id);
            passengerMap.set(p.Id, idval + 1);
        }
        else{
            passengerMap.set(p.Id, 1);
            idval = 0;
        }
            return (

                <React.Fragment key={p.Bookings[idval].Id}>
                    <tr key={`${p.Bookings[idval].Id}`}><td>{`${currentFlight.FlightNumber}-${p.Id}${selectedFlight}-${p.Bookings[idval].Id}`}</td>
                        <td >{`${p.LastName}, ${p.FirstName}`}</td>
                        <td><button className="text-danger"
                        onClick={(x:any)=>handleDeleteBooking(p.Bookings[idval], dispatch, x)}>X</button></td>
                    </tr>
                </React.Fragment>)
        })
    }
    var buttonText = <></>;
    if (currentFlight.PassengerLimit - numberOfPassengers > 0) {
        buttonText = <button type="submit" className="btn btn-primary m-2 border-dark">Add</button>
    } else {
        buttonText = <><button type="submit" className="btn btn-primary m-2 border-dark" disabled>Add</button>
            <small className="text-danger">This flight is full!</small></>
    }
    return (
        <div className="container-fluid border-info border border-dark rounded-end bg-white bg-opacity-50">
            <div className="bg-white  mt-3 border border-dark p-2">
                <h5 className="mt-3 mb-3">{`Passengers on Flight: ${currentFlight.FlightNumber}-${selectedFlight}`}</h5>
                <div>
                    <h6 ><small className="text-muted"></small>{currentFlight.PassengerLimit - numberOfPassengers} Seats Remaining<small></small></h6>
                    <table className="table p-1">
                        <thead>
                            <tr>
                                <th scope="col">Reservation</th><th scope="col">Name</th><th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {passengerlist}
                        </tbody>
                    </table>
                </div>
            </div>
            <h4 className="mt-3 mb-3">Add Passengers</h4>

            <form className="p-3" onSubmit={(e: any) => handleAddPassenger(selectedFlight, selectedPassenger, dispatch, e)}>
                <input
                    type="text"
                    placeholder="Search..."
                    className="container-fluid border-dark"
                    value={passengerFilter}
                    onChange={(e: any) => dispatch(filterPassengerPicker(e.target.value))}
                />
                <PassengerSelectList handler={setSelectedPassenger} selectedValue ={selectedPassenger} />
                {buttonText}
            </form>
        </div>

    );
};

const handleDeleteBooking = (booking: Booking, dispatch:AppDispatch, e:any) =>
{
    dispatch(removeBooking(booking));
    dispatch(getFlightPassengerList(booking.FlightId));
}

const handleAddPassenger = (myFlight: number, myPassenger: number, dispatch: AppDispatch, e: any) => {
    e.preventDefault();
    dispatch(addBooking(myPassenger, myFlight));
    dispatch(getFlightPassengerList(myFlight));
}

export default FlightBookingList;