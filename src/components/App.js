import React from "react";
import axios from "axios";
import MenuDropdown from "./header/Menu";
import User from "./header/User";
import WatchList from "./mainPage/WatchList";
import SearchStock from "./mainPage/SearchStock";
import StockDetails from "./infoPage/StockDetails";
import StockChart from "./infoPage/StockChart";

const serverTop10Companies = (companies) =>
  `https://api.iextrading.com/1.0/tops/last?symbols=${companies}`;
const serverPriceUrl = (stockSymbol) =>
  `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`;
const serverQuoteUrl = (stockSymbol) =>
  `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote?displayPercent=true`;
const serverStatsUrl = (stockSymbol) =>
  `https://api.iextrading.com/1.0/stock/${stockSymbol}/stats`;
const serverPeriodUrl = (stockSymbol, period) =>
  `https://api.iextrading.com/1.0/stock/${stockSymbol}/chart/${period}`;

const StockDetailsPage = ({ selectedStock, backToList }) => (
  <>
    <button onClick={backToList}>Back to list</button>
    <StockDetails stock={selectedStock} />
    <StockChart stock={selectedStock} />
  </>
);

class App extends React.Component {
  constructor() {
    super();

    const currentUser = {
      menu_icon: "menu_icon",
      gravata: "gravata",
      name: "Monica",
      email: "monica@email.com"
    };

    this.state = {
      selectedStock: {
        changePercent: 0
      },
      stocks: [],
      page: "LIST", // LIST || DETAILS

      symbol: '',
      results: [],

      menuVisible: false,
      currentUser: currentUser,

      period: '1y',
      chartData: {}
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);

    this.selectStock = this.selectStock.bind(this);
    this.backToList = this.backToList.bind(this);

    this.getValueFromInput = this.getValueFromInput.bind(this);
    this.addStockToList = this.addStockToList.bind(this);
  }

  clickMenuDropDown() {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  logout() {
    console.log('logging out');
    this.setState({ currentUser: null });
  }

  login() {
    console.log('logging in');
    const currentUser = {
      menu_icon: "menu_icon",
      gravata: "gravata",
      name: "Monica",
      email: "monica@email.com"
    };
    this.setState({ currentUser: currentUser });
  }

  getValueFromInput(e) {
    // console.log(e.target.value)
    this.setState({symbol: e.target.value});
  }

  async fetchStockDetailsFromAPI(symbol) {
    const price = await axios.get(serverPriceUrl(symbol));
    const quote = await axios.get(serverQuoteUrl(symbol));
    const stats = await axios.get(serverStatsUrl(symbol));
    const chart = await axios.get(serverPeriodUrl(symbol));

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

  setPeriod = async e => {
    e.preventDefault();
    await this.setState({
      period: e.target.value
    });
    // console.log(this.state.period);
    this.getChartData();
  }

  getChartData(){
    axios.get(serverPeriodUrl(this.state.selectedStock, this.state.period)).then((results) => {
      const {data} = results;

      // console.log(data);
      const samples = data.map(value=> value.high);
      const dates = data.map(value=>value.date);
      this.setState({
        chartData:{
          labels: dates,
          datasets:[
            {
              label:'High Price',
              data: samples ,
              backgroundColor:[
                // 'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                // 'rgba(255, 206, 86, 0.6)',
                // 'rgba(75, 192, 192, 0.6)',
                // 'rgba(153, 102, 255, 0.6)',
                // 'rgba(255, 159, 64, 0.6)',
                // 'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
        }});
      // console.log({results})
    });
  };

  async componentDidMount() {
    const result = await axios.get(
      serverTop10Companies("googl,aapl,msft,fb,dis,amzn,baba,jnj,brk.a,jpm")
    );

    this.setState({
      stocks: result.data,
     });

     this.getChartData();

  }

  render() {
    return (
      <div className="App">
        <MenuDropdown user={this.state.currentUser} onLogin={this.login} onLogout={this.logout}/>

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
          <StockDetailsPage  selectedStock={this.state.selectedStock} backToList={this.backToList}/>
        )}
      </div>
    );
  }
}

export default App;
