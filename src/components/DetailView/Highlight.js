import React from "react";

function Highlight() {
  return (
    <div className="flex flex-col gap-4">
      <div>Today's Highlights</div>
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {[1, 2, 3, 4, 5, 6].map((highlight) => {
          return (
            <div className="border rounded-lg p-2 w-[32%] h-48">
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

export default Highlight;
