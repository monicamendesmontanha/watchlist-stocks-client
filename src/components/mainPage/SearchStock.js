import React, { Component } from "react";
import axios from 'axios';
import './SearchStocks.css'
// import { Link } from 'react-router-dom';

const LOGO_URL = `https://api.iextrading.com/1.0/stock/AAPL/logo`
const PRICE_URL = `https://api.iextrading.com/1.0/stock/AAPL/price`

class SearchStock extends Component {

  constructor() {
    super();
    this.state = {
      logo: '',
      price: ''
    };

    const fetchStock = () => {
      axios.get(LOGO_URL).then((results) => {
        console.log(results);
      })
    }
    fetchStock();
  }




  render() {
    return (
      <div>
        stock search comming soon.
      </div>
    )
  }
}

export default SearchStock;
