import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import Flight from "../../models/flight";
import { getFlightPassengerList, addBooking } from "../../ducks/bookingducks";
import { useEffect } from "react";
import Passenger from "../../models/passenger";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Booking from "../../models/booking";

type FlightBookingListProps = {
}

const loadPassengerData = (dispatch: AppDispatch, selectedFlight: number) => {
    if (selectedFlight !== undefined) {
        dispatch(getFlightPassengerList(selectedFlight));
    }
}

const FlightBookingList = (props: FlightBookingListProps): JSX.Element => {
    const bookingsById = useSelector((state: RootState) => state.bookings.BookingsByPassengerId);
    const [selectedPassenger, setSelectedPassenger] = useState(-1);
    const passengerFilter = useSelector((state: RootState) => state.ui.filterPassengerPicker);
    const flights = useSelector((state: RootState) => state.flights);
    const selectedFlight = useSelector((state: RootState) => state.ui.selectedFlight);
    const showPassengerList = useSelector((state: RootState) => state.ui.showPassengerList);
    const passengers = useSelector((state: RootState) => state.passengers);
    const dispatch = useDispatch();
    const myFlight = selectedFlight as number;
    useEffect(() => loadPassengerData(dispatch, selectedFlight), [selectedFlight, dispatch]);
    const flightManifests = useSelector((state: RootState) => state.bookings.PassengerManifestsByFlightId);

    if (!showPassengerList || selectedFlight === undefined) return (<></>);
    const flightManifest: Passenger[] = flightManifests[myFlight];
    let currentFlight: Flight = flights.reduce((f: Flight, b: any) => {
        if (f.Id === selectedFlight) return f;
        else return b;
    })
    let filteredList: Passenger[] = [];
    if (passengers !== undefined) {
        filteredList = passengers.filter((p: Passenger) => {
            if (passengerFilter === ""
                || p.FirstName.toLowerCase().indexOf(passengerFilter) !== -1
                || p.LastName.toLowerCase().indexOf(passengerFilter) !== -1) {
                return true;
            }
            else {
                return false;
            }

        });
    }
    var passengerlist: JSX.Element[] = [];
    var numberOfPassengers: number = 0;
    let i: number = 0;
    if (flightManifest !== undefined) {
        numberOfPassengers = flightManifest.length;
        let miniListOfQueues: { [key: number]: number[] } = {};
        flightManifest.forEach((o: Passenger) => {
            if (bookingsById[o.Id] !== undefined) {
                let passengerIdList = (bookingsById[o.Id]).map((x: Booking) => x.Id);
                miniListOfQueues[o.Id] = passengerIdList;
            }
        });

        passengerlist = flightManifest.map((p: Passenger) => {
            let idval: number = 0;
            if (miniListOfQueues[p.Id] !== undefined) {
                let myval = miniListOfQueues[p.Id].pop();
                idval = (myval === undefined) ? 0 : myval;
            }
            return (

                <React.Fragment key={p.Id}>
                    <tr key={`${i++}${idval}`}><td>{`${currentFlight.FlightNumber}-${p.Id}${selectedFlight}-${idval}`}</td>
                        <td >{`${p.LastName}, ${p.FirstName}`}</td>
                    </tr>
                </React.Fragment>)
        })
    }
    var selectlist: JSX.Element[] = [];
    if (filteredList !== undefined) {
        selectlist = filteredList.map((p: Passenger) => {
            return (
                <option key={`${p.Id}${p.LastName}`} value={p.Id}>{`${p.LastName}, ${p.FirstName}`}</option>
            )
        })
    }
    var buttonText = <></>;
    if (currentFlight.PassengerLimit - numberOfPassengers > 0) {
        buttonText = <button type="submit" className="btn btn-primary m-2 border-dark">Add</button>
    } else {
        buttonText = <><button type="submit" className="btn btn-primary m-2 border-dark" disabled>Add</button>
            <small className="text-danger">This flight is full!</small></>
    }
    const firstId = passengers.length > 0 ? passengers[0].Id : 0;
    return (
        <div className="container-fluid border-info border border-dark rounded-end sticky-top bg-white bg-opacity-50">
            <div className="bg-white  mt-3 border border-dark p-2">
                <h5 className="mt-3 mb-3">{`Passengers on Flight: ${currentFlight.FlightNumber}-${selectedFlight}`}</h5>
                <div>
                    <h6 ><small className="text-muted"></small>{currentFlight.PassengerLimit - numberOfPassengers} Seats Remaining<small></small></h6>
                    <table className="table p-1">
                        <thead>
                            <tr>
                                <th scope="col">Reservation</th><th scope="col">Name</th>
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
                {/* <input
                    type="text"
                    placeholder="Search..."
                    className="container-fluid border-dark"
                    value={passengerFilter}
                    onChange={(e: any) => dispatch(filterPassengerPicker(e.target.value))}
                /> */}
                <Form.Select required className="custom-select border border-dark" onChange={(e: any) => setSelectedPassenger(parseInt(e.target.value))}
                    defaultValue={selectedPassenger === undefined ? firstId : selectedPassenger}>
                    {selectlist}
                </Form.Select>
                {buttonText}
            </form>
        </div>

    );
};

const handleAddPassenger = (myFlight: number, myPassenger: number, dispatch: AppDispatch, e: any) => {
    e.preventDefault();
    dispatch(addBooking(myPassenger, myFlight));
    dispatch(getFlightPassengerList(myFlight));
}

export default FlightBookingList;