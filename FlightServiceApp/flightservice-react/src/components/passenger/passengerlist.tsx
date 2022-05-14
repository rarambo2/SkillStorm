import React, { Component } from "react";
  import PassengerSearchBar from "./passengersearchbar";
  import PassengerTable from "./passengertable";
  import Passenger from "../../models/passenger";
  
type PassengerListProps = {
    passengers: Passenger[];
    refreshHandler: (() => void);
}

type PassengerListState = {
    filterText: string;

}

  class PassengerList extends Component<PassengerListProps, PassengerListState> {
    constructor(props: PassengerListProps) {
      super(props);
      this.state = {
        filterText: ''
      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
  
    handleFilterTextChange(filterText: any) {
      this.setState({
        filterText: filterText
      });
    }

  
    render() {
      return (
          <div className="container-fluid">
            <PassengerSearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <PassengerTable
            passengers={this.props.passengers}
            filterText={this.state.filterText}
            refreshHandler={this.props.refreshHandler}
          />

          </div>
      );
    }
  }


  export default PassengerList;