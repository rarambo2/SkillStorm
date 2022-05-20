import { xAirport } from "../../models/airport";

type AirportSelectMenuOptionsProps = {
    airport : xAirport
}

const AirportSelectMenuOptions = (props: AirportSelectMenuOptionsProps): JSX.Element => {
    return (
            <option value={props.airport.Id}>{`(${props.airport.IATACode}) ${props.airport.AirportName}`}</option>
    );
};

export default AirportSelectMenuOptions;