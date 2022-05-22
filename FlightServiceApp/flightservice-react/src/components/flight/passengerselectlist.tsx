import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux"
import { RootState } from "../../store";
import Passenger from "../../models/passenger";


type PassengerSelectListType = {
    handler:any,
    selectedValue: number
}

const PassengerSelectList = (props: PassengerSelectListType) => {
    
    const allPassengers = useSelector((state: RootState) => state.passengers);
    const searchCriteria = useSelector((state: RootState) => state.ui.filterPassengerPicker);
    let filteredList: Passenger[] = [];
    if (allPassengers !== undefined) {
        filteredList = allPassengers.filter((p: Passenger) => {
            if (searchCriteria === "" ||
                p.FirstName.toLowerCase().indexOf(searchCriteria) !== -1 ||
                p.LastName.toLowerCase().indexOf(searchCriteria) !== -1 ) {
                return true;
            } else {
                return false;
            }
        });
    }
    let selectorList: JSX.Element[] = [];
    if(filteredList.length > 0){
        selectorList = filteredList.map((p: Passenger) => {
            return (
                <option key={p.Id} value={p.Id}>{`${p.LastName}, ${p.FirstName}`}</option>
            )
        })
    }

    const firstId = filteredList.length > 0 ? filteredList[0].Id : 0;

    return (
        < Form.Select required className = "custom-select border border-dark" onChange = {(e:any) => props.handler(e.target.value)}
            value={props.selectedValue === undefined ? firstId : props.selectedValue}>
            {selectorList}
        </Form.Select >
    );
}



export default PassengerSelectList;