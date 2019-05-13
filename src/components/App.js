import React from "react";
import axios from "axios";
import Menu from "./header/Menu";
import WatchList from "./mainPage/WatchList";
import SearchStock from "./mainPage/SearchStock";
import StockDetails from "./infoPage/StockDetails";
import BarChart from "./infoPage/barChart";

// import StockChart from "./infoPage/StockChart";
// import ChartTest from './infoPage/ChartTest'

const serverTop10Companies = companies =>
  `https://api.iextrading.com/1.0/tops/last?symbols=${companies}`;
const serverPriceUrl = stockSymbol =>
  `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`;
const serverQuoteUrl = stockSymbol =>
  `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote?displayPercent=true`;
const serverStatsUrl = stockSymbol =>
  `https://api.iextrading.com/1.0/stock/${stockSymbol}/stats`;

const StockDetailsPage = ({ selectedStock, backToList, symbol }) => (
  <>
    <button onClick={backToList}>Back to list</button>
    <StockDetails stock={selectedStock} />
    <BarChart symbol={symbol}/>
    {/* <StockChart stock={selectedStock} /> */}
  </>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedStock: {
        changePercent: 0
      },
      stocks: [],
      page: "LIST", // LIST || DETAILS
      symbol: 'aapl',
      results: []
    };

    this.selectStock = this.selectStock.bind(this);
    this.backToList = this.backToList.bind(this);

    this.getValueFromInput = this.getValueFromInput.bind(this);
    this.addStockToList = this.addStockToList.bind(this);
  }

  getValueFromInput(e) {
    // console.log(e.target.value)
    this.setState({symbol: e.target.value});
  }

  async fetchStockDetailsFromAPI(symbol) {
    const price = await axios.get(serverPriceUrl(symbol));
    const quote = await axios.get(serverQuoteUrl(symbol));
    const stats = await axios.get(serverStatsUrl(symbol));

    return {
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
  }

  async addStockToList(e) {
    e.preventDefault();

    const stock = await this.fetchStockDetailsFromAPI(this.state.symbol);

    this.setState( {
      stocks: [...this.state.stocks, stock] // Add stock searched on the end of list
    });
  }

  backToList() {
    this.setState({
      page: "LIST",
      selectedStock: null
    });
  }

  async selectStock(symbol) {
    const selectedStock = await this.fetchStockDetailsFromAPI(symbol);

    this.setState({
      page: "DETAILS",
      selectedStock
    });
  }

  async componentDidMount() {
    const result = await axios.get(
      serverTop10Companies("googl,aapl,msft,fb,dis,amzn,baba,jnj,brk.a,jpm")
    );

    this.setState({ stocks: result.data });
  }

  render() {
    return (
      <div className="App">
        <Menu />

        {this.state.page === "LIST" ? (
          <>
            <SearchStock getValueFromInput={this.getValueFromInput} addStockToList={this.addStockToList}/>
            <WatchList
              stocks={this.state.stocks}
              page={this.state.page}
              selectStock={this.selectStock}
            />
          </>
        ) : (
          <StockDetailsPage  selectedStock={this.state.selectedStock} backToList={this.backToList} symbol={this.state.symbol}/>
        )}


      </div>
    );
  }
}

export default App;
