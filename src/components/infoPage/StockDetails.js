import React, { Component }  from 'react';
import './StockDetails.css'

// Attempt to round number with 2 decimal places

// const roundWithPrecision = number => (
//   number.toFixed(2)
// )

class StockDetails extends Component {

  render() {
    return(
      <div>
        <p>week52Low: { this.props.stock.week52low }</p>
        <p>week52High: { this.props.stock.week52high }</p>
        <p>Market cap: { this.props.stock.marketcap }</p>
        <p>Revenue: { this.props.stock.revenue }</p>
        <p>Revenue per share: { this.props.stock.revenuePerShare }</p>
        <p>EBITDA: { this.props.stock.ebitda }</p>
        <p>Profit Margin: { this.props.stock.profitMargin }</p>
        <p>ROE: { this.props.stock.returnOnEquity }</p>
        <p>EPS: { this.props.stock.ttmEPS }</p>
        <p>Div.Yield: { this.props.stock.dividendYield }</p>
      </div>
    );
  };
}

export default StockDetails;
