import React from "react";
import Search from "../common/Search";

function SearchCity() {
  return (
    <div>
      <Search value={""} handleChange={() => {}} />
      <img src="" alt="weather-icon" />
      <div>
        <div>12 C</div>
        <div>
          <span>Monday, </span>
          <span>16:00</span>
        </div>
      </div>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200"></hr>
      <div>
        <div>Mostly cloudy</div>
        <div>Rain - 30%</div>
      </div>
      <div>
        <img src="" alt="city" />
      </div>
    </div>
  );
}

export default SearchCity;
