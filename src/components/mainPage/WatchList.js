import React from "react";
import "./WatchList.scss";

const WatchList = props => (
  <div>
    {props.stocks.map(stock => {
      return (

        <div
          key={stock.symbol}
          className="item"
        >
          <button onClick={props.delStock}>Delete</button>

          <div className="symbol_logo">
            <img className="company_logo" alt="" src={stock.symbol === 'GOOGL' ? `http://logo.clearbit.com/googl.com` : `https://storage.googleapis.com/iex/api/logos/${stock.symbol}.png`} />
          </div>

          <div className="symbol_name">
            <div className="symbol">{stock.symbol}</div>
            <div className="name">{stock.companyName}</div>

          </div>

          <div className="price_percent">
            <div className="price">$ {stock.price}</div>
            <div className="percent">$ {(stock.changePercent.toFixed(2))}</div>
          </div>
          <button onClick={() => props.selectStock(stock.symbol)}>ⓘ</button>
        </div>
      );
    })}
  </div>
);

export default WatchList;
