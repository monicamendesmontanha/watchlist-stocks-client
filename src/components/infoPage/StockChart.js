import React from "react";
import { Line } from 'react-chartjs-2';

  const periods = ['1d', '1m', '3m', '6m', '1y', '2y', '5y'];

  const StockChart = ({ stock, period }) => {
    return (
      <>
      {periods.map(period => (<button onClick={period.setPeriod} value={period}>{period}</button>))}
      <Line data={stock.chartData} />
      </>
    )
}

export default StockChart;
