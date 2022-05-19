import { combineReducers } from "redux";
import passengers from "./passengerducks";
import ui from "./uiducks";
import flights from "./flightducks";
import airports from "./airportducks";

export default combineReducers({
    passengers,
    ui,
    flights,
    airports
})