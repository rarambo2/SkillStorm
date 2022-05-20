import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateTimePickerProps = {
    selected: Date;
    flightid: number; // used to tell if props have changed (not just the date)
    handler: any;
}

const DateTimePicker = (props: DateTimePickerProps) => {
    return (<>
        <DatePicker className="border-dark" showTimeSelect
            selected={new Date(props.selected)}
            onChange={(date) => props.handler(date as Date)}
            dateFormat="Pp"
        />
    </>);
}


export default DateTimePicker;
