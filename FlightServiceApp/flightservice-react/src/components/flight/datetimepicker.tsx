import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
//import { Container, Row, Col } from "react-bootstrap";

type DateTimePickerProps = {
    selected : Date;
    flightid : number; // used to tell if props have changed (not just the date)
}

const DateTimePicker = (props: DateTimePickerProps) => {
    const [startDate, setStartDate] = useState(props.selected);
    const [startProps, setStartProps] = useState(props.flightid);
    if(startProps !== props.flightid){
        setStartDate(props.selected);
        setStartProps(props.flightid);
    }
    console.log(props);
    console.log(`startDate ${startDate}`);
      let dateval:Date = new Date(props.selected);
    return (<>
             <DatePicker showTimeSelect
              selected={new Date(startDate)}
              onChange={(date) => setStartDate(date as Date)}
              dateFormat="Pp"
            />
            <p>{`${dateval.toLocaleDateString()} --- ${dateval.toLocaleTimeString()}`}</p> 
    </>);
}


export default DateTimePicker;
