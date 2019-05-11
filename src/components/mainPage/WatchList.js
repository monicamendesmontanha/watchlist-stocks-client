import React, { Component }  from 'react';
import axios from "axios";
import './WatchList.css'
import StockDetails from '../infoPage/StockDetails';
// import SearchStock from './SearchStock';

const serverPriceUrl = (stockSymbol) => `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`;
const serverQuoteUrl = (stockSymbol) => `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote?displayPercent=true`;
const serverStatsUrl = (stockSymbol) => `https://api.iextrading.com/1.0/stock/${stockSymbol}/stats`;

class WatchList extends Component {

  constructor() {
    super();
    this.state = {
      selectedStock: {
        changePercent: 0
      }
    };
  }

  async fetchInfo() {
    const price = await axios.get(serverPriceUrl('googl'));
    const quote = await axios.get(serverQuoteUrl('googl'));
    const stats = await axios.get(serverStatsUrl('googl'));

    console.log(quote)

    const stock = {
      price: price.data,

      symbol: quote.data.symbol,
      companyName: quote.data.companyName,
      changePercent: quote.data.changePercent,

      marketcap: stats.data.marketcap,
      revenuePerShare: stats.data.revenuePerShare,
      revenue: stats.data.revenue,
      week52high: stats.data.week52high,
      week52low: stats.data.week52low,
      ebitda: stats.data.EBITDA,
      dividendYield: stats.data.dividendYield,
      profitMargin: stats.data.profitMargin,
      returnOnEquity: stats.data.returnOnEquity,
      ttmEPS: stats.data.ttmEPS
    };
    console.log(stock)


    this.setState({ selectedStock: stock });
  }

  componentDidMount() {
    this.fetchInfo();
  }

  // TODO:
  // Get and show the logo' company
  // Option to delete the stock on the watchlist of current_user
  // Link to go to details of each company

  render() {
    return(
      <>
      {/* <SearchStock /> */}
      <div className="watch-list">

        <div className="symbol_name">
          <div className="symbol" >{ this.state.selectedStock.symbol }</div>
          <div className="name" >{ this.state.selectedStock.companyName }</div>
        </div>

        <div className="price_percent">
          <div className="price" >{ this.state.selectedStock.price }</div>
          <div className="percent" >{ this.state.selectedStock.changePercent.toFixed(2) }</div>
        </div>
      </div>

        <StockDetails stock={this.state.selectedStock} />
      </>
    );
  }
}

export default WatchList;
