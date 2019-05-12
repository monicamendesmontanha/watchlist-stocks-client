import React from "react";
import "./SearchStocks.css";
import svgSprite from "./search.svg";

const SearchStock = ({ _handleChange, _handleSubmit, }) => {
  return (
    <div>
      <form className="search-stock" onSubmit={_handleSubmit}>
        <div className="search-input">
          <input
            className="input_field"
            type="search"
            onChange={_handleChange}
            placeholder="symbol"
          />
        </div>
        <div>
          <button className="submit_input" type="submit" value="">
            <img className="search" src={svgSprite} alt=" " />
          </button>
        </div>
      </form>
    </div>
  );
};

// Pass the search results as a props to show on watchlist

// class SearchResult extends Component {
//   render() {
//     return (
//       <ul>
//         {this.props.results.map(result => (
//           <li>....</li>
//         ))}
//       </ul>
//     )
//   }
// }

export default SearchStock;
