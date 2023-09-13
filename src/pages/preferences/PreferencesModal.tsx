import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sport } from "../../context/articles/types";
import { sports, teams } from "../../utils/api";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { PreferencesState, Team } from "../../context/preferences/types";
import { updatePreferences } from "../../context/preferences/actions";

const PreferencesModal = () => {
  const preferencesState: PreferencesState = usePreferencesState();
  const preferencesDispatch = usePreferencesDispatch();
  const [selectedSports, setSelectedSports] = useState<string[]>(
    preferencesState.preferences.sports || []
  );
  const [selectedTeams, setSelectedTeams] = useState<string[]>(
    preferencesState.preferences.teams || []
  );
  const [isOpen, setIsOpen] = useState(true);
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };

  useEffect(() => {
    const fetchSportsAndTeam = async () => {
      const sData = await sports();
      const tData = await teams();
      setSportsData(sData.sports);
      setTeamsData(tData);
    };
    fetchSportsAndTeam();
  }, []);

  useEffect(() => {
    if (
      preferencesState.isLoading == false &&
      preferencesState.preferences.sports
    ) {
      setSelectedSports(preferencesState.preferences.sports);
    }
    if (
      preferencesState.isLoading == false &&
      preferencesState.preferences.teams
    ) {
      setSelectedTeams(preferencesState.preferences.teams);
    }
  }, [
    preferencesState.isLoading,
    preferencesState.preferences.sports,
    preferencesState.preferences.teams,
  ]);

  const handleSportsSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedSports((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((item) => item !== value);
      }
    });
  };

  const handleTeamsSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedTeams((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((item) => item !== value);
      }
    });
  };

  const submitPreferences = () => {
    updatePreferences(preferencesDispatch, selectedSports, selectedTeams);
  };

  if (preferencesState.isLoading) {
    return (
      <div className="text-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (preferencesState.isError) {
    return (
      <div className="text-center">
        <span>{preferencesState.errorMessage}</span>
      </div>
    );
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-3xl p-6 my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl">
              <h1 className="text-2xl font-semibold text-gray-900">
                Preferences
              </h1>
              <div className="mt-4">
                <div className="flex flex-col space-y-4">
                  {sportsData.map((sport) => (
                    <div key={sport.id} className="flex items-center">
                      <input
                        id={`sport-${sport.id}`}
                        type="checkbox"
                        value={sport.name}
                        checked={selectedSports.includes(sport.name)}
                        onChange={handleSportsSelect}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`sport-${sport.id}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {sport.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mt-4">
                Teams
              </h1>
              <div className="mt-4">
                <div className="grid grid-cols-3 space-y-4">
                  {teamsData.map((team) => (
                    <div key={team.id} className="flex items-center">
                      <input
                        id={`team-${team.id}`}
                        type="checkbox"
                        value={team.name}
                        checked={selectedTeams.includes(team.name)}
                        onChange={handleTeamsSelect}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`team-${team.id}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {team.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500"
                onClick={submitPreferences}
              >
                Save Preferences
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PreferencesModal;
