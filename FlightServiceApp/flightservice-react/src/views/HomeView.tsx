import PassengerList from "../components/passenger/passengerlist";
import PassengerAddForm from "../components/passenger/passengeraddform"; 
import { useSelector } from "react-redux";
import { RootState } from "../store";


export const HomeView = (props:any) => {
    const passengerId = useSelector((state:RootState) => state.ui.selectedPassenger);
    const addPassengerFormVisible = useSelector((state:RootState) => state.ui.addPassengerFormVisible);
    var containerDivClassName = "row justify-content-xl-left no-gutters p-1";
    var listDivClassName = "col-9";
    var formDivClassName = "col-3 font-weight-normal";
    if(passengerId === undefined){
        if(!addPassengerFormVisible){
            containerDivClassName = "container-fluid";
            listDivClassName = "container-fluid";
            formDivClassName = "";
        }
        else {
            containerDivClassName = "row justify-content-xl-left no-gutters p-1";
            listDivClassName = "col-9";
            formDivClassName = "col p-3 font-weight-normal";            
        }
    } 
      return (
          <div className="container-fluid" >
              <div className = {containerDivClassName}>
                  <div className="Jumbotron text-center"><h1  className="display-2">Passengers</h1></div>
                <div className={listDivClassName}>
                    <PassengerList />
                </div>
                <div className={formDivClassName}>
                    <PassengerAddForm />
                </div>

            </div>
        </div>
      );      
  }

export default HomeView;