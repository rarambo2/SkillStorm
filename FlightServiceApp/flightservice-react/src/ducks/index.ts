import { combineReducers } from "redux";
import passengers from "./passengerducks";
import ui from "./uiducks";
import flights from "./flightducks";

export default combineReducers({
    passengers,
    ui,
    flights
})