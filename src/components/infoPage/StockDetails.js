import React, { Component }  from 'react';
import './StockDetails.css'

// Attempt to round number with 2 decimal places

// const roundWithPrecision = number => (
//   number.toFixed(2)
// )

const StockDetails = (props) => {
  return (<div>
    <p>week52Low: {props.stock.week52low}</p>
    <p>week52High: {props.stock.week52high}</p>
    <p>Market cap: {props.stock.marketcap}</p>
    <p>Revenue: {props.stock.revenue}</p>
    <p>Revenue per share: {props.stock.revenuePerShare}</p>
    <p>EBITDA: {props.stock.ebitda}</p>
    <p>Profit Margin: {props.stock.profitMargin}</p>
    <p>ROE: {props.stock.returnOnEquity}</p>
    <p>EPS: {props.stock.ttmEPS}</p>
    <p>Div.Yield: {props.stock.dividendYield}</p>
  </div>);
}

export default StockDetails;
