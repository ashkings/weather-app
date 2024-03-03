import React from "react";

function Weeks() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((highlight) => {
          return (
            <div className="border rounded-lg p-4 w-[136px] h-36">
              <header>Header</header>
              <div>Body</div>
              <footer>Footer</footer>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Weeks;
