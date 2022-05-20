import PassengerRow from "./passengerrow";
import Passenger from "../../models/passenger";
import PassengerTableColumns from "./passengertablecolumns";
import { RootState } from "../../store";
import { useSelector } from 'react-redux';

function PassengerTable () {
  const passengers = useSelector((state:RootState) => state.passengers);
  const filterText = useSelector((state:RootState) => state.ui.filterText);
  const selectedPassenger = useSelector((state:RootState) => state.ui.selectedPassenger);
  //useEffect(() => {getPassengers(dispatch)}, [])

  let fText:string = filterText.toString().toLowerCase();
  let filteredlist:Passenger[] = passengers
    .filter((p:Passenger) => {
    if(fText === "" 
        || p.FirstName.toLowerCase().indexOf(fText) !== -1 
        || p.LastName.toLowerCase().indexOf(fText) !== -1){
          return true;
        }
        else{return false;}
    })
  return (
    <table className="table table-hover table-bordered border-dark bg-white bg-opacity-75">
      <thead>
        <PassengerTableColumns />
      </thead>
      <tbody>
          {filteredlist.map( (passenger:Passenger) => (
            <PassengerRow 
              passenger={passenger} 
              selected = {passenger.Id === selectedPassenger?true:false}
              key = {passenger.Id} 
              />
          ))}

      </tbody>
    </table>
  );
}


  export default PassengerTable;