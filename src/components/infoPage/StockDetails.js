import React from "react";
import "./StockDetails.scss";

// Attempt to round number with 2 decimal places

// const roundWithPrecision = number => (
//   number.toFixed(2)
// )

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
        <p>week52Low: $ {stock.week52low}</p>
        <p>week52High: $ {stock.week52high}</p>
        <p>Market cap: $ {stock.marketcap}</p>
        <p>Revenue: $ {stock.revenue}</p>
        <p>Revenue per share: $ {stock.revenuePerShare}</p>
        <p>EBITDA: $ {stock.ebitda}</p>
        <p>Profit Margin: $ {stock.profitMargin}</p>
        <p>ROE: $ {stock.returnOnEquity}</p>
        <p>EPS: $ {stock.ttmEPS}</p>
        <p>Div.Yield: $ {stock.dividendYield}</p>
      </div>
    </>
  );
};
export default StockDetails;
