import React, {useState, useEffect} from 'react';
import './App.css';
import MovieDetailComponent from './components/MovieDetailComponent';
import MovieListComponent from './components/MovieListComponent.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Header from './components/user/Header';
import Home from './components/user/Home';
import Login from './components/user/Login';
import Join from './components/user/Join';
import Profile from './components/user/Profile';
import BoardUser from './components/user/BoardUser';
import BoardAdmin from './components/user/BoardAdmin';

function App() {

  return (
    <div> 
     
      <Router> 
      {/* <Header />            */}
          <div className="container">
            <Switch>
              <Route path = "/movieList" component = {MovieListComponent}></Route>
              <Route path = "/movieDetail/:contents_id" component = {MovieDetailComponent}></Route>
        
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/user" component={BoardUser} />
              <Route exact path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
      </Router>
    </div>
  );
  
}

export default App;
