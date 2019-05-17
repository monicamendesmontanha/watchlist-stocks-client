import React from "react";
import "./WatchList.scss";
import info from "./info.svg";
import del from "./del.svg";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const WatchList = props => (
  <div>
    {props.stocks.map(stock => {
      return (
        <div key={stock.symbol} className="item">
          <img className="del-icon" src={del} alt="" onClick={props.delStock} />

          <div className="stock-logo">
            <img className="stock-logo" alt="" src={stock.symbol === 'GOOGL' ? `http://logo.clearbit.com/googl.com` : `https://storage.googleapis.com/iex/api/logos/${stock.symbol}.png`} />
          </div>

          <div className="symbol_name">
            <div className="symbol">{stock.symbol}</div>
            <div className="name">{stock.companyName}</div>
          </div>
          <div className="wiget">
            <TradingViewWidget
              symbol={`NASDAQ:${stock.symbol}`}
              theme={Themes.LIGHT}
              locale="en"
              style="3"
              interval="D"
              hide_legend={true}
              hide_top_toolbar={true}
              width="130%"
              height="155"
            />
          </div>

          <div className="price_percent">
            <div className="price">$ {stock.price}</div>
            <div className="percent">{(stock.changePercent.toFixed(2))}</div>
          </div>
          <img
            className="info-icon"
            onClick={() => props.selectStock(stock.symbol)}
            src={info}
            alt=""
          />
        </div>
      );
    })}
  </div>
);

export default WatchList;
