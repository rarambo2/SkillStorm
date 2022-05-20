import FlightRow from "./flightrow";
import Flight from "../../models/flight";
import FlightTableColumns from "./flighttablecolumns";
import { RootState } from "../../store";
import { useSelector } from 'react-redux';


function FlightTable () {
  const flights = useSelector((state:RootState) => state.flights);
  const flightFilterText = useSelector((state:RootState) => state.ui.flightFilterText);
  const selectedFlight = useSelector((state:RootState) => state.ui.selectedFlight);
  let fText:string = flightFilterText.toString().toLowerCase();
  let filteredlist:Flight[] = flights
    .filter((p:Flight) => {
    if(fText === "" 
        || p.ArrivalAirport.AirportName.toLowerCase().indexOf(fText) !== -1 
        || p.DepartureAirport.AirportName.toLowerCase().indexOf(fText) !== -1
        || p.ArrivalAirport.IATACode.toLowerCase().indexOf(fText) !== -1
        || p.DepartureAirport.IATACode.toLowerCase().indexOf(fText) !== -1       
        || `${p.FlightNumber}`.indexOf(fText) !== -1){
          return true;
        }
        else{return false;}
    })
  return (
    <table className="table table-hover table-bordered border-dark table-responsive-xl bg-white bg-opacity-75">
      <thead>
        <FlightTableColumns />
      </thead>
      <tbody>
          {filteredlist.map( (flight:Flight) => (
            <FlightRow 
              flight={flight} 
              selected = {flight.Id === selectedFlight?true:false}
              key = {flight.Id} 
              />
          ))}

      </tbody>
    </table>
  );
}


  export default FlightTable;