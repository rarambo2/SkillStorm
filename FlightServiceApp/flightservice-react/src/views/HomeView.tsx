import PassengerList from "../components/passenger/passengerlist";
import PassengerAddForm from "../components/passenger/passengeraddform"; 
import { useSelector } from "react-redux";
import { RootState } from "../store";


export const HomeView = (props:any) => {
    const passengerId = useSelector((state:RootState) => state.ui.selectedPassenger);
    const addPassengerFormVisible = useSelector((state:RootState) => state.ui.addPassengerFormVisible);
    var containerDivClassName = "row justify-content-xl-left no-gutters ";
    var listDivClassName = "col-9";
    var formDivClassName = "col-3 font-weight-normal";
    if(passengerId === undefined){
        if(!addPassengerFormVisible){
            containerDivClassName = "container-fluid";
            listDivClassName = "container-fluid";
            formDivClassName = "";
        }
        else {
            containerDivClassName = "row justify-content-xl-left no-gutters ";
            listDivClassName = "col-9";
            formDivClassName = "col font-weight-normal";            
        }
    } 
      return (
          <div className="container-fluid bg-info" >
              <div className = {containerDivClassName}>
                  
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