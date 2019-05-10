import React, { Component } from "react";
import axios from 'axios';
import './SearchStocks.css'
// import { Link } from 'react-router-dom';

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
    let STOCK_URL = `https://api.iextrading.com/1.0/stock/${this.state.symbol}/quote`
    axios.get(STOCK_URL, {heders: API_KEY}).then((results) => {
      console.table(results.data);

      let searchResults = results.data

      this.setState( {
        results: searchResults
      })
    });
  }

  render() {
    return (
      <div>

          <form className="search-stock" onSubmit={this._handleSubmit}>
            <div className="search-input">
              <input type="search" onChange={this._handleChange} placeholder="name or symbol"/>
            </div>
            <div  className="submit-input" >
              <input type="submit" value="search" />
            </div>
          </form>

      </div>
    )
  }
}

// Pass the search results as a props to show on watchlist

// class SearchResult extends Component {
//   render() {
//     return (
//       <ul>
//         {this.props.results.map(result => (
//           <li>....</li>
//         ))}
//       </ul>
//     )
//   }
// }

export default SearchStock;
