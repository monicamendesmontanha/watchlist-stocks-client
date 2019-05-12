import React, { Component } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import './ChartTest.scss'
import svgSprite from '../mainPage/search.svg'


class ChartTest extends Component {
  constructor() {
    super();
    this.state = {
      TIKR: ''
    };
    this._handleChange = this._handleChange.bind(this);
  }

    _handleChange(e) {
        this.setState({TIKR: e.target.value});
    }

  render() {
    return(
      <div>
        <div>
            <input className="input_field" type="search" onChange={this._handleChange} placeholder="search tickr........"/>
            <button className="submit_input" type="submit" value=""><img className="search" src={svgSprite} alt=" " /></button>
          </div>
        <div className="chart-container">
        <TradingViewWidget
          symbol={`NASDAQ:${this.state.TIKR}`}
          theme={Themes.LIGHT}
          style="3"
          locale="en"
          width="100%"
          height="670"
          interval="D"
          withdateranges={true}
        />
      </div>
      </div>
    )
  }
}

export default ChartTest;
