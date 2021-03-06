import { RootState } from "../../store";
import { SearchPassenger, showAddPassengerForm } from "../../ducks/uiducks";
import { useSelector, useDispatch } from 'react-redux';


const useFilterText = () => {
  const filterText = useSelector((state: RootState) =>
    state.ui.filterText);
  return filterText;
}

function PassengerSearchBar() {
  const dispatch = useDispatch();
  const formVisible = useSelector((state: RootState) =>
    state.ui.addPassengerFormVisible);
  let buttoncode = (<></>);
  if (formVisible) {
    buttoncode = (<button disabled type="button"
      className="btn btn-primary col border-dark">Add New Passenger</button>);
  }
  else {
    buttoncode = (<button onClick={(e: any) => dispatch(showAddPassengerForm())}
      className="btn btn-primary col border-dark">
      Add New Passenger
    </button>);
  }


  return (
    <div className="container-fluid p-2 row">
      <div className="col Jumbotron text-center "><h3 >Passengers</h3></div>
      <div className="col-7">
        <input
          type="text"
          placeholder="Search..."
          className="container-fluid border-dark"
          value={useFilterText()}
          onChange={(e: any) => dispatch(SearchPassenger(e.target.value))}
        />
      </div>
      <div className="col-sm">
        {buttoncode}
      </div>
    </div>
  );
}


export default PassengerSearchBar;