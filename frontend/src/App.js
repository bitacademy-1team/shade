import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Grid } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieListComponent from "./components/MovieListComponent";
import ShowListComponent from "./components/ShowListComponent";
import Join from "./components/Join";
import Login from "./components/Login";
import MovieDetailComponent from "./components/MovieDetailComponent";
import MovieRecommendComponent from "./components/MovieRecommendListComponent";
// import Home from "./components/Home";
import Mypage from "./components/Mypage";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import FrequentlyAskedQuestions from "./components/FAQ";
import FindId from "./components/FindId";
import FindPw from "./components/FindPw";
import Headerbox from "./components/HeaderBox";
import OAuth2RedirectHandler from './service/oauth2/OAuth2RedirectHandler'
//import Home from './components/user/Home';
//import Profile from './components/user/Profile';
import Contents from './components/contents/contents'
import api from './components/api'
import ChatRoom from './components/contents/chat/ChatRoom';
import Main from './components//Main';

function App() {

  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <Header/>
        </Grid>
        <Grid item container>
          <Grid item xs={12}>
            <Switch>
              <Route path = {["/main","/home"]} component={Main}></Route>
              <Route path = "/movieList" component = {MovieListComponent}></Route>
              <Route path = "/tvList" component = {ShowListComponent}></Route>
              <Route path = "/movieDetail/:contents_id" component = {MovieDetailComponent}></Route>
              <Route path = "/recommend" component = {MovieRecommendComponent}></Route>
              {/* <Route exact path={["/", "/home"]} component={Home} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/join" component={Join} />
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/user" component={BoardUser} />
              <Route exact path="/admin" component={BoardAdmin} />
              <Route exact path="/faq" component={FrequentlyAskedQuestions}/>
              <Route exact path="/findid" component={FindId}/>
              <Route exact path="/findpw" component={FindPw}/>
              {/* <Route exact path="/test" component={Headerbox}/> */}
              <Route exact path="/contents" component={Contents} />
              <Route exact path="/api" component={api} />
              <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
            </Switch>
          </Grid>
        </Grid>
        <Grid item>
          <ChatRoom />
          <Footer/>
        </Grid>
      </Grid>
    </Router>

  );
}

export default App;
