import React, { Component }  from 'react';
import axios from "axios";
import './WatchList.css'
import SearchStock from './SearchStock';

const serverUrl = (stockSymbol) => `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote`;

class WatchList extends Component {

  constructor() {
    super();
    this.state = {
      symbol: '',
      companyName: '',
      price: '',
      changePercent: 0
    };

    const fetchInfo = () => {
      axios.get(serverUrl('googl')).then( (results) => {
        this.setState({
          symbol: results.data.symbol,
          companyName: results.data.companyName,
          price: results.data.calculationPrice === "close" ? results.data.close : results.data.calculationPrice,
          changePercent: results.data.changePercent
        });
      });
    };
    fetchInfo();

  }

  // TODO:
  // Get and show the logo' company
  // Option to delete the stock on the watchlist of current_user
  // Link to go to details of each company

  render() {
    return(
      <>
      <SearchStock />
      <div className="watch-list">

        <div className="symbol_name">
          <div className="symbol" >{ this.state.symbol }</div>
          <div className="name" >{ this.state.companyName }</div>
        </div>

        <div className="price_percent">
          <div className="price" >{ this.state.price }</div>
          <div className="percent" >{ this.state.changePercent.toFixed(2)  }</div>
        </div>

      </div>
      </>
    );
  }
}

export default WatchList;