import React from "react";
import Weeks from "./Weeks";
import Highlight from "./Highlight";

function DetailView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>Tabs</div>
        <div className="flex gap-4">
          <div className="flex gap-4">
            <div>C</div>
            <div>F</div>
          </div>
          <div>User Icon</div>
        </div>
      </div>
      <Weeks />
      <Highlight />
    </div>
  );
}

export default DetailView;
