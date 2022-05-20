import React from "react";
import FlightSearchBar from "./flightsearchbar";
import FlightTable from "./flighttable";

type FlightListProps = {
}

type FlightListState = {
  selectedFlight: number | undefined;
}

class FlightList extends React.Component<any, FlightListState>{
  constructor(props: FlightListProps) {
    super(props);
    this.state = {
      selectedFlight: undefined
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <FlightSearchBar />
        <FlightTable />
      </div>
    );
  }
}


export default FlightList;