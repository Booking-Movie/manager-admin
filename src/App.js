import React from "react";
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AdminTemPlate } from "./template/AdminTemplate";
import Movie from "./page/Movie";
import Users from "./page/Users";
import Profile from "./page/Profile";
import Dashboard from "./page/Dashboad";
import Signin from "./page/Signin";
import Modal from "react-modal";
import Signup from "./page/Signup";
import Cinema from "./page/Cinema";
import ManagerNews from "./page/News";

Modal.setAppElement('#modal_root');

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <AdminTemPlate path="/dashboard" exact Component={Dashboard} />
        <AdminTemPlate path="/users" exact Component={Users} />
        <AdminTemPlate path="/movie" exact Component={Movie} />
        <AdminTemPlate path="/profile" exact Component={Profile} />
        <AdminTemPlate path="/cinema" exact Component={Cinema} />
        <AdminTemPlate path="/news" exact Component={ManagerNews} />
      </Switch>
    </Router>
  );
}

export default App;
