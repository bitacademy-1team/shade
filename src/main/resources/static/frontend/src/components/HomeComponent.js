import React, {useState, useEffect} from 'react';
import logo from '../logo.svg';
import '../App.css';

function HomeComponent() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">msg : </h1>
        <button id="btn1">11</button>
        <button id="btn2">11</button>
        <button id="btn1">11</button>
        <button id="btn1">11</button>
      </header>
    </div>
  );
}

export default HomeComponent;