import React from "react";
import "./SearchStocks.scss";
import svgSprite from "./search.svg";

const SearchStock = ({ getValueFromInput, addStockToList }) => {
  return (
    <div>
      <form className="search-stock" onSubmit={addStockToList}>
        <div className="search-input">
          <div class="cursor">
            <input
              className="input_field"
              type="search"
              onChange={getValueFromInput}
              placeholder="symbol"
            />
            <i />
          </div>
        </div>
        <div>
          <button className="submit_input" type="submit" value="">
            <img className="search-button" src={svgSprite} alt=" " />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchStock;
