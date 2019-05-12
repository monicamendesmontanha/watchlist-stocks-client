import React, { Component } from 'react';
import axios from "axios";
import svgSprite from '../mainPage/search.svg'



class StockChart extends Component {
  //________________Constructor _______________________
  constructor() {
    super();
    this.state = {
      TIKR: '',
      chartResults: []
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

//_____________________________________Data Retreival Blocks ___________________________________________
  //_____Handles the input from the form --- when submitted it is sent to the state ______
  _handleChange(e) {
      // e.preventDefault();
      this.setState({TIKR: e.target.value});
  }
  //_____Handles the input from the form --- when submitted it is sent to the state ______
  _handleSubmit(e) {

    // grabbig api key
    const API_KEY = `pk_4b310245e2ee4af09ad1647819bdc6a5`;
    //chart URL
    const CHART_URL = `https://cloud.iexapis.com/stable/stock/${this.state.TIKR}/chart?token=${API_KEY}`;

    axios.get(CHART_URL).then((results) => {
      console.table(results.data);
      let chartData = results.data


      this.setState( {
      chartResults: chartData
      })
    });
  }
  //_____________________________________Data Retreival Block End ___________________________________________

//_____________Render ______________________
  render() {
    return (
      <div>
        <form className="chart-form" onSubmit={this._handleSubmit}>
            <input className="input_field" type="search" onChange={this._handleChange} placeholder="Chart Search Test."/>
          <div>
            <button className="submit_input" type="submit" value=""><img className="search" src={svgSprite} alt=" " /></button>
          </div>
        </form>
      </div>
    )
  }
}
//_____________Render End ______________________

  //--------------Test for Chart Data----------------
  // <p>{this.state.chartResults}</p>
export default StockChart;
