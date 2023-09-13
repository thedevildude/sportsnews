import React from "react";
import {
  useMatchListDispatch,
  useMatchListState,
} from "../../context/livescore/context";
import { Match, MatchListState } from "../../context/livescore/types";
import { format } from "date-fns";
import { fetchUpdatedMatchScore } from "../../context/livescore/actions";
import { usePreferencesState } from "../../context/preferences/context";
import { useAuthenticationState } from "../../context/authentication/context";

const MatchListItems = () => {
  const matchListState: MatchListState = useMatchListState();
  const authenticationState = useAuthenticationState();
  const preferencesState = usePreferencesState();
  const matchListDispatch = useMatchListDispatch();

  const handleUpdate = (matchId: string) => {
    fetchUpdatedMatchScore(matchListDispatch, matchId);
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

  const filteredMatches =
    authenticationState.isAuthenticated &&
    preferencesState.preferences?.sports?.length > 0
      ? matchListState.matches.filter((match) => {
          return preferencesState.preferences.sports.includes(match.sportName);
        })
      : matchListState.matches;

  return (
    <div className="flex">
      {filteredMatches.map((match: Match) => (
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
              ? `Ends at ${format(
                  new Date(match.endsAt),
                  "yyyy-MM-dd HH:mm:ss"
                )}`
              : `Ended at ${format(
                  new Date(match.endsAt),
                  "yyyy-MM-dd HH:mm:ss"
                )}`}
          </p>
          <div className="mt-2">
            {match.teams.map((team, index) => (
              <div
                key={index}
                className="grid grid-cols-2 justify-center text-xs"
              >
                <p>{team.name}</p>
                <p>
                  {match?.score &&
                    Object.keys(match.score).map((key) =>
                      key === team.name
                        ? match.score
                          ? match.score[key]
                          : undefined
                        : null
                    )}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleUpdate(match.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2 text-xs hover:bg-blue-600 disabled:bg-gray-500"
            disabled={match.isRunning === false}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchListItems;
