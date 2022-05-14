import React from 'react';
import NavBar from "./components/navbar";
import './App.css';
import HomeView from './views/HomeView';
import FlightView from './views/FlightView';
import { BrowserRouter, Routes, Route } from "react-router-dom";

type AppProps = {
};

type AppState = {
}

class App extends React.Component<AppProps, AppState> {
  render(){
    return (
      <div>
      <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path="/" element={ <HomeView /> } />
          <Route path="/flight" element={ <FlightView /> } />

        </Routes>
      </BrowserRouter>

      <main role="main" className="container">

      </main>

      </div>

    );      
  }
}



export default App;
