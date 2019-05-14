import React, { Component } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import "./StockChart.scss";
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: "1y",
      chartData: {}
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  stock_period_url = (symbol, period) => {
    return `https://api.iextrading.com/1.0/stock/${symbol}/chart/${period}`;
  };

  setPeriod = async e => {
    e.preventDefault();
    await this.setState({
      period: e.target.value
    });
    console.log(this.state.period);
    this.getChartData();
  };

  getChartData() {
    axios
      .get(this.stock_period_url(this.props.symbol, this.state.period))
      .then(results => {
        // console.table(results.data);
        // let chartData = results.data
        //
        //
        // this.setState( {
        // chartResults: chartData
        // })
        const { data } = results;
        // console.log(data);
        const samples = data.map(value => value.high);
        const dates = data.map(value => value.date);
        // this.setState({chartData: results});
        this.setState({
          chartData: {
            labels: dates,
            datasets: [
              {
                label: "High Price",
                data: samples,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)"
                  // 'rgba(54, 162, 235, 0.6)',
                  // 'rgba(255, 206, 86, 0.6)',
                  // 'rgba(75, 192, 192, 0.6)',
                  // 'rgba(153, 102, 255, 0.6)',
                  // 'rgba(255, 159, 64, 0.6)',
                  // 'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
        console.log({ results });
      });
  }

  render() {
    const { symbol } = this.props;
    const periods = ["1d", "1m", "3m", "6m", "1y", "2y", "5y"];

    return (
      <>
        <div className="chart-container">
          {periods.map(period => (
            <button
              className="period-buttons"
              onClick={this.setPeriod}
              value={period}
            >
              {period}
            </button>
          ))}
          <div className="current-period">
            Current Period: {this.state.period}
          </div>
          <Line data={this.state.chartData} />
        </div>
      </>
    );
  }
}

export default BarChart;
