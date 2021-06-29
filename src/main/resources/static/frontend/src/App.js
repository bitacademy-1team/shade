import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import MovieDetailComponent from './components/MovieDetailComponent';
import MovieListComponent from './components/MovieListComponent.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

function App() {

  return (
    <div> 
      <Router>            
          <div className="container">
            <Switch>
              <Route path = "/movieList" component = {MovieListComponent}></Route>
              <Route path = "/movieDetail/:contents_id" component = {MovieDetailComponent}></Route>
            </Switch>
          </div>
      </Router>
    </div>
  );
  
}

export default App;
