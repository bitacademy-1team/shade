import React, {useState, useEffect} from 'react';
import './App.css';
import MovieDetailComponent from './components/MovieDetailComponent';
import MovieListComponent from './components/MovieListComponent.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/user/Home';
import Login from './components/user/Login';
import Join from './components/user/Join';
import Profile from './components/user/Profile';
import BoardUser from './components/user/BoardUser';
import BoardAdmin from './components/user/BoardAdmin';
import MovieRecommendListComponent from './components/MovieRecommendListComponent';
import Contents from './components/contents/contents'
import api from './components/api'
function App() {

  return (
    <div> 
     
      <Router> 
      {/* <Header />            */}
          <div className="container">
            <Switch>
              <Route path = "/movieList" component = {MovieListComponent}></Route>
              <Route path = "/movieDetail/:contents_id" component = {MovieDetailComponent}></Route>
              <Route path = "/movieRecommend" component = {MovieRecommendListComponent}></Route>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/user" component={BoardUser} />
              <Route exact path="/admin" component={BoardAdmin} />
              <Route exact path="/contents" component={Contents} />
              <Route exact path="/api" component={api} />
            </Switch>
          </div>
      </Router>
    </div>
  );
  
}

export default App;
