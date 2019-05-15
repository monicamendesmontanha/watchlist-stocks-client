import React from "react";
import "./StockDetails.scss";

// Attempt to round number with 2 decimal places

// const roundWithPrecision = number => (
//   number.toFixed(2)
// )

const StockDetails = ({ stock }) => {
  return (
    <div className="stock-details">
      <p>week52Low: {(stock.week52low).toFixed(2)}</p>
      <p>week52High: {(stock.week52high).toFixed(2)}</p>
      <p>Market cap: {(stock.marketcap).toFixed(2)}</p>
      <p>Revenue: {(stock.revenue).toFixed(2)}</p>
      <p>Revenue per share: {stock.revenuePerShare}</p>

      <p>EBITDA: {stock.ebitda}</p>
      <p>Profit Margin: {stock.profitMargin} %</p>
      <p>ROE: {stock.returnOnEquity}</p>
      <p>EPS: {stock.ttmEPS}</p>
      <p>Div.Yield: {(stock.dividendYield).toFixed(2)}</p>
    </div>
  );
};

export default StockDetails;
