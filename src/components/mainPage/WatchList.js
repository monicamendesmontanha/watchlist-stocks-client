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
          <div className="symbol_name">
            <div className="symbol">{stock.symbol}</div>
          </div>

          <div className="price_percent">
            <div className="price">$ {stock.price}</div>
          </div>
          <button onClick={() => props.selectStock(stock.symbol)}>ⓘ</button>
        </div>
      );
    })}
  </div>
);

export default WatchList;
