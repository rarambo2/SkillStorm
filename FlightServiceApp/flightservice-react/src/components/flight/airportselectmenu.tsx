import { useEffect, useState } from "react";
import { getAirports } from "../../ducks/airportducks";
import { selectAirport, AirportSelectorType } from "../../ducks/uiducks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { xAirport } from "../../models/airport";
import AirportSelectMenuOptions from "./airportselectmenuoptions";
import Form  from "react-bootstrap/Form";
import { AppDispatch } from "../../store"


type AirportSelectMenuProps = {
    value : number
    id : string
    tag : string
}

const AirportSelectMenu = (props:AirportSelectMenuProps) : JSX.Element => {
    const dispatch = useDispatch();
    //useEffect(() => {getAirports(dispatch)}, []);
    const airports = useSelector((state:RootState) => state.airports);
    const selectedAirport:number | undefined = useSelector((state:RootState) => (getAirportSelector(state, props.tag)));
    if(selectedAirport !== undefined ){
        console.log(`AirportSelectMenu `);
        console.log(selectedAirport);


    }
    const rendered : JSX.Element[] = [];
    const mappedlist = airports.map((airport:xAirport) => {
        rendered.push(<AirportSelectMenuOptions airport={airport} key={airport.Id}/>)});
    return(
        <Form.Select required className="custom-select" id={props.id} defaultValue={selectedAirport === undefined ?"":selectedAirport}
        onChange={(e:any) => handleSelectAirport(props.tag, e.target.value, dispatch, e)}>
        {rendered}
        </Form.Select>
    );
}

const handleSelectAirport = (mytag: string, newval:number, dispatch:AppDispatch, e:any) => {
    dispatch(selectAirport(mytag, newval));
}

const getAirportSelector = (state: RootState, key: string):number | undefined => {
    let myAirportSelector:AirportSelectorType = state.ui.selectedAirport as AirportSelectorType;

    switch(key)
    {
        case "AddDepartureAirport":
            return myAirportSelector.AddDepartureAirport;
        case "AddArrivalAirport" : 
            return myAirportSelector.AddArrivalAirport;
        case "EditDepartureAirport" : 
            return myAirportSelector.EditDepartureAirport;
        case "EditArrivalAirport" :
            return myAirportSelector.EditArrivalAirport;
        default:
            return undefined;
    }

}
export default AirportSelectMenu;