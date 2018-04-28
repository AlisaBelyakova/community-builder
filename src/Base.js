import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <nav className="App-sidebar">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> ONE WORLD</h1>

          <button className="sidebar-btn" id="main">Simulate</button> 
          <button className="sidebar-btn">Settings</button>
        </nav>

        <div className="App-content">
          <p className="App-intro">
          </p>
        </div>
      </div>
    );
  }
}

export default App;
