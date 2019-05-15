import React from "react";
import "./StockDetails.scss";

// Attempt to round number with 2 decimal places

// const roundWithPrecision = number => (
//   number.toFixed(2)
// )


function intToString (value) {
  var suffixes = ["", "K", "M", "B","T"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 != 0) {
      var shortNum = shortValue.toFixed(1);
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
          <div>$ {stock.price}</div>
          <div>{stock.changePercent}</div>
        </div>
      </div>

      <div className="stock-details">
        <p>week52Low:($) {stock.week52low}</p>
        <p>week52High:($) {stock.week52high}</p>
        <p>Market cap:($) {intToString(stock.marketcap)}</p>
        <p>Revenue:($) {stock.revenue}</p>
        <p>Revenue per share:($) {stock.revenuePerShare}</p>
        <p>EBITDA: {stock.ebitda}</p>
        <p>Profit Margin: $ {stock.profitMargin}</p>
        <p>ROE: {stock.returnOnEquity}</p>
        <p>EPS: {stock.ttmEPS}</p>
        <p>Div.Yield: {stock.dividendYield}</p>
      </div>
    </>
  );
};
export default StockDetails;
