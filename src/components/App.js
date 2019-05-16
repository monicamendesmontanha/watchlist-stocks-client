import React from "react";
import axios from "axios";
import "../App.scss";
import homeButton from "./home.svg";

import MenuDropdown from "./header/Menu";
import WatchList from "./mainPage/WatchList";
import SearchStock from "./mainPage/SearchStock";
import StockDetails from "./infoPage/StockDetails";
import StockChart from "./infoPage/StockChart";

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
    <div>
      <button className="mobile-button" onClick={backToList}>
        <img className="mobile-button-icon" src={homeButton} alt=" " />
      </button>
      <button className="back-to-list" onClick={backToList}>
        Back to list
      </button>
    </div>
    <StockDetails stock={selectedStock} />
    <StockChart symbol={symbol} />
  </>
);

class App extends React.Component {
  constructor() {
    super();

    const currentUser = {
      menu_icon: "menu_icon",
      gravata: "gravata",
      name: "Luke",
      email: "luke@email.com"
    };

    this.state = {
      selectedStock: {
        changePercent: 0
      },
      stocks: [],
      page: "LIST", // LIST || DETAILS

      symbol: "",
      results: [],

      menuVisible: false,
      currentUser: currentUser
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);

    this.selectStock = this.selectStock.bind(this);
    this.backToList = this.backToList.bind(this);

    this.getValueFromInput = this.getValueFromInput.bind(this);
    this.addStockToList = this.addStockToList.bind(this);


    ///////////////////////////REST api for reading////////////////////////
    this.gettingUserInfo = this.gettingUserInfo.bind(this); // getting user information from data base
    // this.gettingUserInfo() test completed

    this.gettingUserStock = this.gettingUserStock.bind(this)
    // this.gettingUserStock() //test completed

    this.gettingStockList = this.gettingStockList.bind(this)
    // this.gettingStockList() test completed


    //////////////REST API for writing. Please change the paramaters before apply
    this.addingStocktoUser = this.addingStocktoUser.bind(this) //test completed
    // this.addingStocktoUser()// test completed

    this.addingStockList = this.addingStockList.bind(this)
    // this.addingStockList() //test completed
    
    // this.deleteUserStock = this.deleteUserStock.bind(this) don't use this code for the moment
    // this.deleteUserStock()

    this.deleteStockList =this.deleteStockList.bind(this)
    // this.deleteStockList() test copleted

  }
 
  deleteStockList(){
    
  console.log('deleteStockList fired');
  axios.post('http://localhost:3333/stock/deletelist', {listname:"del", listcontents: 'del'}, {withCredentials: true}).then((result)=>{ //need option?
    console.log('This is deleteUserStock result: ', result);
  })
}

gettingStockList(){ //getting user's favorit stock list

    console.log('gettingStockList fired');

    axios.get('http://localhost:3333/stock/mylist', {withCredentials: true}).then((result)=>{ //need option?
      console.log('This is favorite Stock List info: ', result.data);
    })

  }

 //about getting data from server 
//  deleteUserStock(){

//   console.log('deleteUserStock fired');
//   axios.post('http://localhost:3333/stock/deletestock', {aa:"tst1"}, {withCredentials: true}).then((result)=>{ //need option?
//     console.log('This is deleteUserStock result: ', result);
//   })
// }


 addingStockList(){
  console.log('addingStockList fired');
  axios.post('http://localhost:3333/stock/addlist', {
    listname: 'test12',
    listcontents: 'test12' // aapl,samsung,googl
}, {withCredentials: true}).then((result)=>{ //need option?
    console.log('This is addingStockList result: ');
  })
}

 addingStocktoUser(){ //adding data to server. Paramater to be changed as per situation.
  console.log('addingStocktoUser fired');
    axios.post('http://localhost:3333/stock/addstock', {stocksymbol: "test"}, {withCredentials: true}).then((result)=>{ //need option?
      console.log('This is added stock info: ', result.data);
    })
  }


  gettingUserStock(){ //getting stocks that user added.
    console.log('gettingUserStock fired');

    axios.get('http://localhost:3333/stock/mystock', {withCredentials: true}).then((result)=>{ //need option?
      console.log('this is userStock info: ', result.data);
    })

  }

  gettingUserInfo(){ //getting user info
    console.log('userinfo fired');
    axios.get('http://localhost:3333/user/info', {withCredentials: true}).then((result)=>{ //need option?
      console.log('This is the user info: ', result.data);
    })

  }
 //////////////////////////////REST API END ////////////////////////////////////////////////////////////////////////


  clickMenuDropDown() {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  logout() {
    console.log("logging out");
    this.setState({ currentUser: null });
  }

  login() {
    let path = `/login`;
    this.props.history.push(path);
  }

  getValueFromInput(e) {
    this.setState({ symbol: e.target.value });
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

    this.setState({
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
      selectedStock,
      symbol
    });
  }

  async componentDidMount() {
    const result = await axios.get(
      serverTop10Companies("googl,aapl,msft,fb,dis,amzn,baba,jnj,brk.a,jpm")
    );

    this.setState({
      stocks: result.data
    });
  }

  deleteStock = (index, e) => {
    const stocks = Object.assign([], this.state.stocks);
    stocks.splice(index, 1);
    this.setState({stocks: stocks});
  }
  
  render() {
    return (
      <div className="App">
        <MenuDropdown
          user={this.state.currentUser}
          onLogin={this.login}
          onLogout={this.logout}
        />

        {this.state.page === "LIST" ? (
          <>
            <SearchStock
              getValueFromInput={this.getValueFromInput}
              addStockToList={this.addStockToList}
            />
            <WatchList
              stocks={this.state.stocks}
              page={this.state.page}
              selectStock={this.selectStock}
              delStock={this.deleteStock.bind(this.index)}

            />
          </>
        ) : (
          <StockDetailsPage
            selectedStock={this.state.selectedStock}
            backToList={this.backToList}
            symbol={this.state.symbol}
          />
        )}
      </div>
    );
  }
}

export default App;
