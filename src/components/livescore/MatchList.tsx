import React, { useEffect } from "react";
import { useMatchListDispatch } from "../../context/livescore/context";
import { fetchMatches } from "../../context/livescore/actions";
import MatchListItems from "./MatchListItems";

const MatchList = () => {
  const matchListDispatch = useMatchListDispatch();
  useEffect(() => {
    fetchMatches(matchListDispatch);
  }, [matchListDispatch]);

  return (
    <div className="overflow-x-auto whitespace-no-wrap">
      <MatchListItems />
    </div>
  );
};

export default MatchList;
