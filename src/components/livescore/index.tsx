import React from "react";
import MatchList from "./MatchList";

const Matches = () => {
  return <div>
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-semibold">
        Live Score
      </h2>
      <MatchList/>
    </div>
  </div>;
};

export default Matches;