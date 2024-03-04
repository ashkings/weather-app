import React from "react";
import searchIcon from "../../assets/icons/search.svg";
import targetIcon from "../../assets/icons/target.png";

function Search({
  value,
  handleChange,
  handleSubmit,
  placeholder = "Search for places...",
}) {
  return (
    <div className="flex">
      <img alt="search-icon" src={searchIcon} className="w-5" />
      <input
        type="search"
        id="default-search"
        className="block w-full pr-4 py-4 ps-3 text-sm text-black rounded-l dark:placeholder-black focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        <img alt="search-icon" src={targetIcon} className="w-4" />
      </button>
    </div>
  );
}

export default Search;
