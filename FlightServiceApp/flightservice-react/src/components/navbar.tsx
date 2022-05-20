import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

type NavBarProps = {

};

type NavBarState = {
    selected : number;
}

class NavBar extends Component<NavBarProps, NavBarState> {
    render() {
        return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <LinkContainer to="/">
            <a className="navbar-brand" href="/">Flight Service</a>
            </LinkContainer>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="basic-navbar-nav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <LinkContainer to="/">
                <a className="nav-link" aria-current="page" href="/">Passengers</a>
                </LinkContainer>
                </li>
                <li className="nav-item">
                <LinkContainer to="/flight">
                <a className="nav-link" href="/flight">Flights</a>
                </LinkContainer>
                </li>
            </ul> 
            </div> 
        </div>
        
        </nav>
        );
    }
}

export default NavBar;