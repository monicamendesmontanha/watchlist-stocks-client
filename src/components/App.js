import React from "react";
import axios from "axios";
import "../App.scss";
import homeButton from "./home.svg";

import MenuDropdown from "./header/Menu";
import WatchList from "./mainPage/WatchList";
import SearchStock from "./mainPage/SearchStock";
import StockDetails from "./infoPage/StockDetails";
import StockChart from "./infoPage/StockChart";


// const serverTop10Companies = companies =>
//   `https://api.iextrading.com/1.0/tops/last?symbols=${companies}`;

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
      name: "",
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
      currentUser: currentUser, 

      newloading: []
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);

    this.selectStock = this.selectStock.bind(this);
    this.backToList = this.backToList.bind(this);

    this.getValueFromInput = this.getValueFromInput.bind(this);
    this.addStockToList = this.addStockToList.bind(this);

    ///////////////////////////REST api for reading////////////////////////
    this.gettingUserInfo = this.gettingUserInfo.bind(this); // getting user information from data base
    this.gettingUserInfo()

    // this.gettingUserStock = this.gettingUserStock.bind(this);
    // this.gettingUserStock() //test completed

    this.gettingStockList = this.gettingStockList.bind(this)
    // this.gettingStockList() //test completed


    //////////////REST API for writing. Please change the paramaters before apply
    // this.addingStocktoUser = this.addingStocktoUser.bind(this) //test completed
    // this.addingStocktoUser()// test completed

    this.addingStockList = this.addingStockList.bind(this)
    // // this.addingStockList() //test completed
    
   
    this.deleteStockList =this.deleteStockList.bind(this)
    // this.deleteStockList() test copleted
    // this.deleteStockList()
    this.noLoginList= this.noLoginList.bind(this)
    this.noLoginList() //To be replaced

    // this.initialStockLoading = this.initialStockLoading.bind(this)
    // initialStockLoading()
    this.initialstocks = this.initialstocks.bind(this)
    this.initialstocks()
  }


  // updatingStockList(){ //getting user's favorit stock list

  //   console.log('gettingStockList fired');

  //   axios.get('http://localhost:3333/stock/update',{listcontents:}, {withCredentials: true}).then((result)=>{ //need option?
  //     console.log('This is favorite Stock List info: ', result.data);
  //   })

  // }

  initialstocks() { //working on here
    // e.preventDefault();
    setTimeout(()=>{
      console.log('initial list fired');
      console.log('this is this.state.symbol', this.state);
    
      let previousList = []
      this.state.stocks.forEach((el)=>{
        previousList.push(el.symbol)
      })
    
      let initialstock = this.state.newloading
      // 여기다 넣는 거구나 
       initialstock.forEach(async(e)=>{
        console.log('this is e', e)
         if(previousList.indexOf(e) === -1){
          let stock = await this.fetchStockDetailsFromAPI(e); 
          console.log('this is changed stock', stock);
          this.setState({
            stocks: [...this.state.stocks, stock] // Add stock searched on the end of list
          });
         }
         
      })
    }, 1500)

  }
   


  noLoginList(){
    setTimeout(() => {
      if(this.state.currentUser.name ===""){
        console.log('nologin function fired'); 
        console.log('currentuser.name', this.state.currentUser.name) 
        console.log('currentuser', this.state.currentUser) 
        axios.get('http://localhost:3333/', {withCredentials: true}).then((result)=>{ //need option?
          let companylist = result.data.nostocklist.split(',')
          let newlist =[]
          companylist.forEach((e)=>{
          newlist.push(e)})
          console.log('this is new list', newlist); //여기까지는 문제 없음
          this.setState({newloading: newlist})
          console.log('this is state.newloading', this.state.newloading);
        })
    }else{
        console.log('currentuser', this.state.currentUser) 
        console.log('currentuser.name', this.state.currentUser.name) 
        console.log('login function fired');
        axios.get('http://localhost:3333/stock/mylist', {withCredentials: true}).then((result)=>{ //need option?
        console.log('this is userStocklist info: ', result.data);
          let companylist = result.data.listcontents.split(',')
          let newlist =[]
          companylist.forEach((e)=>{
          newlist.push(e)})
          console.log('this is new list', newlist); //여기까지는 문제 없음
          this.setState({newloading: newlist})
          console.log('this is state.newloading', this.state.newloading);
        })
    }

    }, 1000);

}


 
  deleteStockList(){
  console.log('deleteStockList fired');
  axios.post('http://localhost:3333/stock/deletelist',{listname:"listname"}, {withCredentials: true}).then((result)=>{ //need option?
    console.log('This is deleteUserStock result: ', result);
    console.log('delete completed')
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

 


  addingStockList() {
    console.log("addingStockList fired");
    axios
      .post(
        "http://localhost:3333/stock/addlist",
        {
          listname: "test12",
          listcontents: "test12" // aapl,samsung,googl
        },
        { withCredentials: true }
      )
      .then(result => {
        //need option?
        console.log("This is addingStockList result: ");
      });
  }

  addingStocktoUser() {
    //adding data to server. Paramater to be changed as per situation.
    console.log("addingStocktoUser fired");
    axios
      .post(
        "http://localhost:3333/stock/addstock",
        { stocksymbol: "test" },
        { withCredentials: true }
      )
      .then(result => {
        //need option?
        console.log("This is added stock info: ", result.data);
      });
  }

  gettingUserInfo(){ //getting user info
    console.log('userinfo fired');
    axios.get('http://localhost:3333/user/info', {withCredentials: true}).then((result)=>{ //need option?
      console.log('This is the user info: ', result.data);
      this.setState({currentUser: result.data })
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
    ///working on
    this.setState({ currentUser: null });
    
    axios.get('http://localhost:3333/auth/logout', {withCredentials: true}).then((result)=>{ //need option?
    console.log('This is deleteUserStock result: ', result);
    console.log('delete completed')
    console.log('logout fired');
  })
  
  // window.location.reload(true); 
  // console.log('refresh fired');
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

////main code ////main code ////main code 
//this was for first loading


//this was for first loading


  


///////////main code ////main code ////main code 
  async addStockToList(e) {
    e.preventDefault();
    console.log("addstock list fired");

    // async componentDidMount() {
    //   const result = await axios.get(
    //     serverTop10Companies("googl,aapl,msft,fb,dis,amzn,baba,jnj,brk.a,jpm")
    //   );

    //   this.setState({
    //     stocks: result.data
    //   }); 

    const stock = await this.fetchStockDetailsFromAPI(this.state.symbol);
    // console.log('this is stock list', stock)
    // console.log('this is previous stock list?', this.state.stocks) //this.state.stocks
    let previousList = [];
    this.state.stocks.forEach(el => {
      previousList.push(el.symbol);
    });
    // console.log('this is  previous list', previousList);
    // console.log('symbole to be added', stock)
    // console.log('index of', previousList.indexOf(stock.symbol))
    if (previousList.indexOf(stock.symbol) === -1) {
      console.log("stock can be added as it is not included :", stock);
      this.setState({
        stocks: [...this.state.stocks, stock] // Add stock searched on the end of list
      });
    } else {
      console.log("the stock cannot be added ad it is already in the list");
    }
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

  

  deleteStock = (index) => {
    const stocks = Object.assign([], this.state.stocks);
    stocks.splice(index, 1);
    this.setState({ stocks: stocks });
  };

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
