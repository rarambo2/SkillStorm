import FlightList from "../components/flight/flightlist";
import FlightAddForm from "../components/flight/flightaddform"; 
import FlightBookingList from "../components/flight/flightbookinglist";
import { useSelector } from "react-redux";
import { RootState } from "../store";



export const FlightView = (props:any) => {
    const flightId = useSelector((state:RootState) => state.ui.selectedFlight);
    const addFlightFormVisible = useSelector((state:RootState) => state.ui.addFlightFormVisible);
    var containerDivClassName = "row no-gutters p-1";
    var listDivClassName = "col-9";
    var formDivClassName = "col-3 font-weight-normal";
    if(flightId === undefined){
        if(!addFlightFormVisible){
            containerDivClassName = "container-fluid";
            listDivClassName = "container-fluid";
            formDivClassName = "";
        }
        else {
            containerDivClassName = "row justify-content-xl-left no-gutters p";
            listDivClassName = "col-9";
            formDivClassName = "col-3 font-weight-normal";            
        }
    } 
      return (
          <div className="container-fluid bg-info" >
              <div className = {containerDivClassName}>
                 <div className={listDivClassName}>
                    <FlightList />
                </div>
                <div className={formDivClassName}>
                    <FlightAddForm />
                    <FlightBookingList />
                </div>

            </div>
        </div>
      );      
  }

export default FlightView;