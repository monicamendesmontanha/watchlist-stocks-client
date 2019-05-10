import React, { Component }  from 'react';
import axios from "axios";

const SERVER_URL = "https://api.iextrading.com/1.0/stock/aapl/quote";

class WatchList extends Component {

  constructor() {
    super();
    this.state = {
      symbol: '',
      companyName: '',
      price: '',
      oscilation: ''
    };

    const fetchSymbol = () => {
      axios.get(SERVER_URL).then( (results) => {
        this.setState({ symbol: results.data.symbol });
      });
    };
    fetchSymbol();

    const fetchCompanyName = () => {
      axios.get(SERVER_URL).then( (results) => {
        this.setState({ companyName: results.data.companyName});
      });
    };
    fetchCompanyName();

    const fetchPrice = () => {
      axios.get(SERVER_URL).then( (results) => {
        if (results.data.calculationPrice === "close" ) {
          this.setState({ price: results.data.close})
        } else {
          this.setState({ price: results.data.calculationPrice})
        }
      });
    };
    fetchPrice();

    const fetchChangePercent = () => {
      axios.get(SERVER_URL).then( (results) => {
        this.setState({ changePercent: results.data.changePercent});
      });
    };
    fetchChangePercent();

  }

  render() {
    return(
      <div>
        <h1>STOCKS</h1>


        <div>
          <div>{ this.state.symbol}</div>
          <div>{ this.state.companyName }</div>
        </div>

        <div>
          <div>{ this.state.price }</div>
          <div>{ this.state.changePercent}</div>
        </div>

      </div>
    );
  }
}

export default WatchList;