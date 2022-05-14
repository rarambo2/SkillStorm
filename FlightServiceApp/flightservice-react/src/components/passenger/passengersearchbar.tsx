import React, { ChangeEventHandler, PureComponent } from "react";

type PassengerSearchBarProps = {
    filterText: string;
    onFilterTextChange: ChangeEventHandler<HTMLInputElement>;
};

type PassengerSearchBarState = {
    filterText: string;
};


class PassengerSearchBar extends PureComponent<PassengerSearchBarProps, PassengerSearchBarState> {
    constructor(props: PassengerSearchBarProps) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    state: PassengerSearchBarState = {
        filterText: "",
    };
    
    handleFilterTextChange(e: any) {
        this.setState({
            filterText: e.target.value
        });
        this.props.onFilterTextChange(e.target.value);
    }
    
 
    render() {
      return (
        <div className="container-fluid p-3">
          <input
            type="text"
            placeholder="Search..."
            className="container-fluid"
            value={this.state.filterText}
            onChange={this.handleFilterTextChange}
          />
        </div>
      );
    }
  }

export default PassengerSearchBar;