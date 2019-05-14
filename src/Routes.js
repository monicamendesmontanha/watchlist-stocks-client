import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import App from "./components/App";
import Menu from "./components/header/Menu";
import User from "./components/header/User";
import StockChart from "./components/infoPage/StockChart";
import StockDetails from "./components/infoPage/StockDetails";
import Login from "./components/loginPage/Login";
import SearchStock from "./components/mainPage/SearchStock";
import WatchList from "./components/mainPage/WatchList";
import SignUp from "./components/SignupPage/signup";

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/menu" component={Menu} />
      <Route exact path="/user" component={User} />
      <Route exact path="/stockchart" component={StockChart} />
      <Route exact path="/stockdetails" component={StockDetails} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/searchstock" component={SearchStock} />
      <Route exact path="/watchlist" component={WatchList} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  </Router>
);

export default Routes;
