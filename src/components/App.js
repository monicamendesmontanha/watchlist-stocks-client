import React from 'react';
import Menu from './header/Menu';
import StockChart from './infoPage/StockChart'
import WatchList from './mainPage/WatchList';
import SearchStock from './mainPage/SearchStock'

function App() {
  return (
    <div className="App">
      <Menu />
      <SearchStock />
      <WatchList />
    </div>
  );
}

export default App;
