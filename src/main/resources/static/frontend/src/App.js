import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() =>{
    fetch('/home')
      .then(response=>response.text())
      .then(message =>{
        setMessage(message);
      })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">msg : {message}</h1>
        <button id="btn1">next</button>
        <button id="btn2">보기</button>
      </header>
    </div>
  );
}

export default App;
