import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import Menu from './components/header/Menu';
import User from './components/header/User';
import ActionHome from './components/infoPage/ActionHome';
import StockChart from './components/infoPage/StockChart';
import StockDetails from './components/infoPage/StockDetails';
import StockPrice from './components/infoPage/StockPrice';
import Login from './components/loginPage/Login';
import ActionReload from './components/mainPage/ActionReload';
import SearchStock from './components/mainPage/SearchStock';
import WatchList from './components/mainPage/WatchList';
import SignUp from './components/SignupPage/Signup';




const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ App } />
      <Route exact path="/menu" component={ Menu } />
      <Route exact path="/user" component={ User } />
      <Route exact path="/actionhome" component={ ActionHome } />
      <Route exact path="/stockchart" component={ StockChart } />
      <Route exact path="/stockdetails" component={ StockDetails } />
      <Route exact path="/stockprice" component={ StockPrice } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/actionreload" component={ ActionReload } />
      <Route exact path="/searchstock" component={ SearchStock } />
      <Route exact path="/watchlist" component={ WatchList } />
      <Route exact path="/signup" component={ SignUp } />

    </div>
  </Router>
);

export default Routes;
