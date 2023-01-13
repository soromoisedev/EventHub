import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomePage from "./pages/home/home";
import Header from "./components/header/header";
import Connection from './components/connection/connection'
import SignUp from "./components/signup/signup";
import EventList from "./pages/eventsList/eventsList";
import './style.css'
import { EventDetail } from "./pages/eventDetail/eventDetail";
import Dashboard from "./pages/dashboard/dashboard";
import { setUsername, setInitialName, setToken, setRole } from "./redux/user";
import Admin from "./pages/admin/admin";

function App() {
  const connection = useSelector((state) => state.user.wantconnect)
  const signup = useSelector((state) => state.user.wantsignup)
  const dispatch = useDispatch()

  dispatch(setUsername(localStorage.getItem('username') || ""))
  dispatch(setInitialName(localStorage.getItem('initialName') || ""))
  dispatch(setToken(localStorage.getItem('token') || ""))
  dispatch(setRole(localStorage.getItem("role") || ""))

  return (
    <div className="App">
      <Router>
        <div className="mainScreen">
          <Header />
          <Switch>
            <Route exact path={"/"} >
              <HomePage />
            </Route>
            <Route path={"/eventList"} >
              <EventList />
            </Route>
            <Route path={"/eventDetail/:id"} >
              <EventDetail />
            </Route>
            <Route path={"/dashboard"} >
              {localStorage.getItem("role") === "superAdmin" ? <Admin /> : <Dashboard />}
            </Route>
            <Route path={"/adminDash"} >
              <Admin />
            </Route>
          </Switch>
          {connection ? <div className="blur"><Connection /></div> : null}
          {signup ? <div className="blur"><SignUp /></div> : null}
          {/* {connection ? <div className="blur"> <Connection /> </div> : null} */}
        </div>
      </Router>
    </div>
  );
}

export default App;
