import React, { Component } from 'react';

import './Menu.scss'
//import { css, cx } from 'emotion'



class Menu extends Component {

  render() {
    return (
      <div >
        <header>
          <div className="header-container">
            </div>
          <h1>Stocks</h1>
          <input id="burger" type="checkbox" />
          <label onClick={this.changeVisibility}
          id="label-menu" for="burger">
            <span></span>
            <span></span>
            <span></span>
      </label>

      <nav id="visible-id" >
  <ul>
    <li><a href="/">App</a></li>
    <li><a href="/menu">Menu</a></li>
    <li><a href="/user">User</a></li>
    <li><a href="/actionhome">ActionHome</a></li>
    <li><a href="/stockchart">StockChart</a></li>
    <li><a href="/stockdetails">StockDetails</a></li>
    <li><a href="/stockprice">StockPrice</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/actionreload">ActionReload</a></li>
    <li><a href="/searchstock">SearchStock</a></li>
    <li><a href="/watchlist">WatchList</a></li>
    <li><a href="/signup">SignUp</a></li>
  </ul>
</nav>
      </header>
      </div>
    );
  }
}

export default Menu;
