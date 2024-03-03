import React from "react";
import searchIcon from "../../assets/icons/search.svg";
import targetIcon from "../../assets/icons/target.png";

function Search({ value, handleChange, placeholder = "Search for places..." }) {
  return (
    <div className="flex">
      <img alt="search-icon" src={searchIcon} className="w-5" />
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-black rounded-l dark:placeholder-black focus:outline-none"
        placeholder={placeholder}
        value={value}
        handleChange={handleChange}
      />
      <button type="submit">
        <img alt="search-icon" src={targetIcon} className="w-4" />
      </button>
    </div>
  );
}

export default Search;
