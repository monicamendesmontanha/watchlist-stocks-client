import React from "react";
import "./SearchStocks.css";
import svgSprite from "./search.svg";

const SearchStock = ({ getValueFromInput, addStockToList, }) => {
  return (
    <div>
      <form className="search-stock" onSubmit={addStockToList}>
        <div className="search-input">
          <input
            className="input_field"
            type="search"
            onChange={getValueFromInput}
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

export default SearchStock;
