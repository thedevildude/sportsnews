import React from "react";
import { useMatchListState } from "../../context/livescore/context";
import { Match, MatchListState } from "../../context/livescore/types";
import { format } from "date-fns";

const MatchListItems = () => {
  const matchListState: MatchListState = useMatchListState();

  const handleUpdate = (matchId: number) => {
    // Implement your update logic here for the specific matchId
    console.log(`Update match with id ${matchId}`);
  };

  if (matchListState.isLoading) {
    return (
      <div className="text-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (matchListState.isError) {
    return (
      <div className="text-center">
        <span>{matchListState.errorMessage}</span>
      </div>
    );
  }

  return (
    <div className="flex">
      {matchListState.matches.map((match: Match) => (
        <div
          key={match.id}
          className="w-64 p-4 mb-4 mx-2 border rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
        >
          {match.isRunning && (
            <div className="absolute top-2 right-2">
              <span className="text-green-500">
                <i className="fas fa-circle"></i> Running
              </span>
            </div>
          )}
          <p className="font-semibold text-lg mb-2">{match.sportName}</p>
          <p className="text-gray-600 text-sm">{match.location}</p>
          <p className="text-xs mt-1">
            {match.isRunning
              ? `Started at ${format(
                  new Date(match.endsAt),
                  "yyyy-MM-dd HH:mm:ss"
                )}`
              : `Starts at ${format(
                  new Date(match.endsAt),
                  "yyyy-MM-dd HH:mm:ss"
                )}`}
          </p>
          <div className="mt-2">
            {match.teams.map((team, index) => (
              <p key={index} className="text-blue-500 text-xs">
                {team.name}
              </p>
            ))}
          </div>
          <button
            onClick={() => handleUpdate(match.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2 text-xs hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchListItems;
