import { AppDispatch, RootState } from "../../store";
import Passenger from "../../models/passenger";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { unselectPassenger } from "../../ducks/uiducks";
import { updatePassenger, addPassenger } from "../../ducks/passengerducks";


export const PassengerAddForm = (props:any)=>{

    const dispatch = useDispatch();
    const addNewPassenger = useSelector((state:RootState) => state.ui.addPassengerFormVisible);
    const passengerid = useSelector((state:RootState) => state.ui.selectedPassenger);
    const passenger = useSelector((state:RootState) => (state.passengers.filter((p:Passenger) => p.Id === passengerid)).pop()) ?? undefined;
    const [passFName, setPassFName] = useState(passenger === undefined? "" : passenger.FirstName);
    const [passLName, setPassLName] = useState(passenger === undefined? "" : passenger.LastName);
    const [passAge, setPassAge] = useState(passenger === undefined? "" : passenger.Age);
    const [passEmail, setPassEmail] = useState(passenger === undefined? "" : passenger.Email);
    const [passJob, setPassJob] = useState(passenger === undefined? "" : passenger.Job);
    const [passId, setPassId] = useState(passenger === undefined? undefined : passenger.Id);
    const [Init, setInit] = useState(true);
    if(passengerid === undefined && !addNewPassenger){
        return (<></>);
    } else {   
        if(addNewPassenger){
            if(Init){
                setPassId(-1);
                setPassFName("");
                setPassLName("");
                setPassAge(-1);
                setPassEmail("");
                setPassJob(""); 
                setInit(false); //Done Clearing the Form, don't do it again.
            }
            return (
                <form className="bg-info p-3  sticky-top" onSubmit={(e:any) => {setInit(true); handleCreate({
                    Id : passId,
                    FirstName : passFName,
                    LastName : passLName,
                    Age : passAge,
                    Email : passEmail,
                    Job : passJob
                }, dispatch, e)}}>
                <h3> Add Passenger </h3>
                <div className ="form-group">
                    <label htmlFor="passengerFirstNameField">First Name</label>
                    <input required
                        type="text"
                     className="form-control" id="passengerFirstNameField" value={passFName}  onChange = {
                        (e:any) => setPassFName(e.target.value)}/>
                    <div className="invalid-feedback">
                        Please enter a first name.
                    </div>
                </div>   
                <div className ="form-group">
                    <label htmlFor="passengerLastNameField">Last Name</label>
                    <input required className="form-control" id="passengerLastNameField" value={passLName}  onChange = {
                        (e:any) => setPassLName(e.target.value)}/>
                    <div className="invalid-feedback">
                        Please enter a last name.
                    </div>                        
                </div>
                <div className ="form-group">
                    <label htmlFor="passengerAgeField">Age</label>
                    <input required className="form-control" id="passengerAgeField" value={(passAge === -1)?"" : passAge}  type="number" onChange={
                        (e:any) => setPassAge(e.target.value)}/>
                <div className="invalid-feedback">
                        Please enter an age.
                </div> 
                </div>
                                          
                <div className="form-group">
                    <label form="passengerEmailField">Email address</label>
                    <input type="email" className="form-control" id="passengerEmailField" aria-describedby="emailHelp" value={passEmail}  onChange={
                        (e:any) => setPassEmail(e.target.value)}/>
                </div>
                <div className ="form-group">
                    <label htmlFor="passengerJobField">Occupation</label>
                    <input className="form-control" id="passengerJobField" value={passJob}  onChange={
                        (e:any) => setPassJob(e.target.value)}/>
                </div>            
                <button type="reset" className="btn btn-primary m-2" onClick={(e:any) => handleCancel(dispatch,e)}>Cancel</button>
                <button type="submit" className="btn btn-primary m-2">Save</button>

                </form>
            );
                

                       
        }

        if(passenger.Id !== passId){
            setPassId(passenger.Id);
            setPassFName(passenger.FirstName);
            setPassLName(passenger.LastName);
            setPassAge(passenger.Age);
            setPassEmail(passenger.Email);
            setPassJob(passenger.Job);
        }         
        return(

            <form className="bg-info p-3  sticky-top" onSubmit={(e:any) => {setInit(true); handleSubmit({
                Id : passenger.Id,
                FirstName : passFName,
                LastName : passLName,
                Age : passAge,
                Email : passEmail,
                Job : passJob
            }, dispatch, e)}}>
            <h3> Edit Passenger </h3>
            <div className ="form-group">
                <label htmlFor="passengerIdField">Passenger Identifier</label>
                <input className="form-control" id="passengerIdField" value={passId} placeholder={passId} readOnly={true}/>
            </div>
            <div className ="form-group">
                <label htmlFor="passengerFirstNameField">First Name</label>
                <input required className="form-control" id="passengerFirstNameField" value={passFName} placeholder={passFName} onChange = {
                    (e:any) => setPassFName(e.target.value)}/>
            </div>   
            <div className ="form-group">
                <label htmlFor="passengerLastNameField">Last Name</label>
                <input required className="form-control" id="passengerLastNameField" value={passLName} placeholder={passLName} onChange = {
                    (e:any) => setPassLName(e.target.value)}/>
            </div>
            <div className ="form-group">
                <label htmlFor="passengerAgeField">Age</label>
                <input required className="form-control" id="passengerAgeField" value={passAge} placeholder={passAge} onChange={
                    (e:any) => setPassAge(e.target.value)}/>
            </div>                                           
            <div className="form-group">
                <label form="passengerEmailField">Email address</label>
                <input type="email" className="form-control" id="passengerEmailField" aria-describedby="emailHelp" value={passEmail} placeholder={passEmail} onChange={
                    (e:any) => setPassEmail(e.target.value)}/>
            </div>
            <div className ="form-group">
                <label htmlFor="passengerJobField">Occupation</label>
                <input className="form-control" id="passengerJobField" value={passJob} placeholder={passJob} onChange={
                    (e:any) => setPassJob(e.target.value)}/>
            </div>            
            <button type="reset" className="btn btn-primary m-2" onClick={(e:any) => handleCancel(dispatch,e)}>Cancel</button>
            <button type="submit" className="btn btn-primary m-2">Save</button>
            </form>
        );
    }
}

const handleCancel = (dispatch:AppDispatch, e:any) => {
    dispatch(unselectPassenger());
}

const handleSubmit = (newPass:Passenger, dispatch:AppDispatch, e:any) => {
    e.preventDefault();
    if(newPass.Age < 0 || newPass.Age > 150)
    {
        alert("Please enter a valid age.");
    }
    else {
        newPass.FirstName.trim().slice(0,20);
        newPass.LastName.trim().slice(0,20);
        newPass.Email.trim().slice(0,50);
        newPass.Job.trim().slice(0,30);
        dispatch(updatePassenger(newPass));
    }
}

const handleCreate = (newPass:Passenger, dispatch:AppDispatch, e:any) => {
    e.preventDefault();
    if(newPass.Age < 0 || newPass.Age > 150)
    {
        alert("Please enter a valid age.");
    }
    else{
        newPass.FirstName.trim().slice(0,20);
        newPass.LastName.trim().slice(0,20);
        newPass.Email.trim().slice(0,50);
        newPass.Job.trim().slice(0,30);
        dispatch(addPassenger(newPass));
    }
}


export default PassengerAddForm;

