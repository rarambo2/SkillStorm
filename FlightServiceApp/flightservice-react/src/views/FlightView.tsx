import FlightList from "../components/flight/flightlist";
import FlightAddForm from "../components/flight/flightaddform"; 
import { useSelector } from "react-redux";
import { RootState } from "../store";



export const FlightView = (props:any) => {
    const flightId = useSelector((state:RootState) => state.ui.selectedFlight);
    const addFlightFormVisible = useSelector((state:RootState) => state.ui.addFlightFormVisible);
    if(flightId === undefined){
        if(!addFlightFormVisible){
            var containerDivClassName = "container-fluid";
            var listDivClassName = "container-fluid";
            var formDivClassName = "";
        }
        else {
            var containerDivClassName = "row justify-content-xl-left no-gutters p-1";
            var listDivClassName = "col-9";
            var formDivClassName = "col-3 font-weight-normal";            
        }
    } 
    else {
        var containerDivClassName = "row no-gutters p-1";
        var listDivClassName = "col-9";
        var formDivClassName = "col-3 font-weight-normal";
    }
      return (
          <div className="container-fluid" >
              <div className = {containerDivClassName}>
                  <div className="Jumbotron text-center"><h1  className="display-2">Flights</h1></div>
                 <div className={listDivClassName}>
                    <FlightList />
                </div>
                <div className={formDivClassName}>
                    <FlightAddForm />
                </div>

            </div>
        </div>
      );      
  }

export default FlightView;