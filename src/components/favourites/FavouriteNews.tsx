import React, { useEffect, useState } from "react";
import { useAuthenticationState } from "../../context/authentication/context";
import { usePreferencesState } from "../../context/preferences/context";
import { Sport } from "../../context/articles/types";
import { sports, teams } from "../../utils/api";
import { useMatchListState } from "../../context/livescore/context";
import { Team } from "../../context/preferences/types";
import FavouriteNewsCard from "./FavouriteNewsCard";

const FavouriteNews = () => {
  const authenticationState = useAuthenticationState();
  const preferencesState = usePreferencesState();
  const matchList = useMatchListState();
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchSportsAndTeams = async () => {
      const sdata = await sports();
      const tdata = await teams();
      setSportsData(sdata.sports);
      setTeamsData(tdata);
    };
    fetchSportsAndTeams();
  }, []);

  // Updates the list of teams when the selected sport changes
  useEffect(() => {
    if (selectedSport) {
      let teamsForSport = teamsData.filter((team) =>
        team.plays.includes(selectedSport)
      );
      teamsForSport =
        authenticationState.isAuthenticated &&
        preferencesState.preferences?.teams?.length > 0
          ? teamsForSport.filter((team) =>
              preferencesState.preferences.teams.includes(team.name)
            )
          : teamsForSport;
      setFilteredTeams(teamsForSport);
    }
  }, [
    authenticationState.isAuthenticated,
    preferencesState.preferences.teams,
    selectedSport,
    teamsData,
  ]);

  const filteredSports =
    authenticationState.isAuthenticated &&
    preferencesState.preferences?.sports?.length > 0
      ? sportsData.filter((sport) =>
          preferencesState.preferences.sports.includes(sport.name)
        )
      : sportsData;

  const handleSportSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };
  const handleTeamSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  const filteredMatches = matchList.matches.filter((match) => {
    if (selectedSport && selectedTeam) {
      return match.teams.some((team) => team.name === selectedTeam);
    } else if (selectedSport) {
      return match.sportName.includes(selectedSport);
    } else {
      return true;
    }
  });

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <select
          className="bg-gray-50 border border-gray-300 text-blue-600 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          onChange={(e) => handleSportSelect(e)}
        >
          <option value="">Select a sport</option>
          {filteredSports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
        {selectedSport && (
          <select
            className="bg-gray-50 border border-gray-300 text-blue-600 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            onChange={(e) => handleTeamSelect(e)}
          >
            <option value="">Select a Team</option>
            {filteredTeams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {filteredMatches.map((match) => (
        <FavouriteNewsCard key={match.id} {...match} />
      ))}
    </div>
  );
};

export default FavouriteNews;
