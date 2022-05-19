import { RootState } from "../../store";
import { SearchFlight, showAddFlightForm } from "../../ducks/uiducks";
import { useSelector, useDispatch } from 'react-redux';


const useFlightFilterText = () => {
  const flightfilterText = useSelector((state:RootState) =>
    state.ui.flightFilterText);
  return flightfilterText;
}

function FlightSearchBar () {
  const dispatch = useDispatch();
  const formVisible = useSelector((state:RootState) =>
    state.ui.addFlightFormVisible);
  if(formVisible){
    var buttoncode = (<button disabled type="button" 
    className="btn btn-secondary col">Add New Flight</button>);
  }
  else
  {
    var buttoncode =  (<button onClick={(e:any)=>dispatch(showAddFlightForm())}
      className="btn btn-secondary col">
        Add New Flight
        </button>);
  }


  return (
    <div className="container-fluid p-3 row">
      <div className="col-7">
      <input
        type="text"
        placeholder="Search..."
        className="container-fluid"
        value={useFlightFilterText()}
        onChange={(e:any) => dispatch(SearchFlight(e.target.value))}
      />
      </div>
      <div className="col-sm">
            {buttoncode}
        </div>
    </div>
  );
}


  export default FlightSearchBar;