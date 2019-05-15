import React from "react";
import "./StockDetails.scss";

function intToString (value) {
  var suffixes = ["", "K", "M", "B","T"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 != 0) {
      // var shortNum = shortValue.toFixed(1);
  }
  return shortValue+suffixes[suffixNum];
}

const StockDetails = ({ stock }) => {
  return (
    <>
      <div className="stock-details-container">
        <div>
          <div> {stock.symbol}</div>
          <div>{stock.companyName}</div>
        </div>
        <div>
          <div>$ {(stock.price).toFixed(2)}</div>
          <div>{(stock.changePercent).toFixed(2)}</div>
        </div>
      </div>

      <div className="stock-details">
        <p>week52Low:($) {(stock.week52low).toFixed(2)}</p>
        <p>week52High:($) {(stock.week52high).toFixed(2)}</p>
        <p>Market cap:($) {intToString(stock.marketcap)}</p>
        <p>Revenue:($) {(stock.revenue).toFixed(2)}</p>
        <p>Revenue per share:($) {(stock.revenuePerShare).toFixed(2)}</p>
        <p>EBITDA: {(stock.ebitda).toFixed(2)}</p>
        <p>Profit Margin: $ {(stock.profitMargin).toFixed(2)}</p>
        <p>ROE: {(stock.returnOnEquity).toFixed(2)}</p>
        <p>EPS: {(stock.ttmEPS).toFixed(2)}</p>
        <p>Div.Yield: {(stock.dividendYield).toFixed(2)}</p>
      </div>
    </>
  );
};
export default StockDetails;
