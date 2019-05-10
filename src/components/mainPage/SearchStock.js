import React, { Component } from "react";
import axios from 'axios';
import './SearchStocks.css'
// import { Link } from 'react-router-dom';

const STOCK_URL = `https://api.iextrading.com/1.0/stock/aapl/quote`

const API_KEY = `pk_4b310245e2ee4af09ad1647819bdc6a5`;

class SearchStock extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      symbol: '',
      results: []
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(e) {
    // e.preventDefault();
    this.setState({name: e.target.value, symbol: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();
    axios.get(STOCK_URL, {heders: API_KEY}).then((results) => {
      console.table(results.data);
      // debugger;
      let searchResults = results.data.flights.filter(el => (el.dep_city === this.state.dep_city && el.arr_city === this.state.arr_city));

      this.setState( {
        results: searchResults
      })
    });
  }

  render() {
    return (
      <div>

          <form className="search_stock" onSubmit={this._handleSubmit}>
            <input type="search" className="search_input" onChange={this._handleChange} placeholder="name or symbol"/>
            <input className="submit_input" type="submit" value="search" />
          </form>

      </div>
    )
  }
}

export default SearchStock;
