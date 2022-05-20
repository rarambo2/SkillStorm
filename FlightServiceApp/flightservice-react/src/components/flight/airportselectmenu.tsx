import { useSelector} from "react-redux";
import { RootState } from "../../store";
import {xAirport} from "../../models/airport";
import AirportSelectMenuOptions from "./airportselectmenuoptions";
import Form  from "react-bootstrap/Form";



type AirportSelectMenuProps = {
    value : number
    id : string
    handler : any
    flightid : number
}

const AirportSelectMenu = (props:AirportSelectMenuProps) : JSX.Element => {
    const airports = useSelector((state:RootState) => state.airports);

     const rendered : JSX.Element[] = [];
    const mappedlist = airports.map((airport:xAirport) => {
        rendered.push(<AirportSelectMenuOptions airport={airport} key={airport.Id}/>)});
    return(
        <Form.Select required className="custom-select" id={props.id} defaultValue={props.value === undefined ?"":props.value}
        onChange={(e:any) => props.handler(parseInt(e.target.value))}>
        {rendered}
        </Form.Select>
    );
}


export default AirportSelectMenu;