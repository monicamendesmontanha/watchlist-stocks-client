import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./StockChart.scss";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: "1y",
      chartData: {},
      buttonColor: "#45a29e",
      textColor: "#1f2833"
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
    this.setState({ buttonColor: "#66fcf1" });
    this.setState({ textColor: "#1f2833" });
    this.getChartData();
  };

  getChartData() {
    axios
      .get(this.stock_period_url(this.props.symbol, this.state.period))
      .then(results => {
        const { data } = results;
        const samples = data.map(value => value.high);
        const dates = data.map(value => value.date);
        const minutes = data.map(value => value.minute);
        this.setState({
          chartData: {
            labels: this.state.period === "1d" ? minutes: dates,
            datasets: [
              {
                label: "Price",
                data: samples,
                backgroundColor: ["rgba(75, 192, 192, 0.6)"]
              }
            ]
          }
        });
        // console.log({ results });
      });
  }

  render() {
    const periods = ["1d", "1m", "3m", "6m", "1y", "2y", "5y"];
  
      return (
        <>
          <div className="chart-container">
            <div className="current-period" />
            {periods.map(period => (
              <button
                className="period-buttons"
                onClick={this.setPeriod}
                style={
                  period === this.state.period
                    ? {
                        color: "#1f2833",
                        backgroundColor: "#66fcf1",
                        border: "2px solid #1f2833"
                      }
                    : { color: "#66fcf1", backgroundColor: "#1f2833" }
                }
                value={period}
              >
                {period}
              </button>
            ))}

            <Line data={this.state.chartData} />
          </div>
        </>
      );
  }
}

export default BarChart;
