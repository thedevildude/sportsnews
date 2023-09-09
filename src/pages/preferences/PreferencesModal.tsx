import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sport } from "../../context/articles/types";
import { sports } from "../../utils/api";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { PreferencesState } from "../../context/preferences/types";
import { updatePreferences } from "../../context/preferences/actions";

const PreferencesModal = () => {
  const preferencesState: PreferencesState = usePreferencesState();
  const preferencesDispatch = usePreferencesDispatch();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    preferencesState.preferences.sports || []
  );
  const [isOpen, setIsOpen] = useState(true);
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };

  useEffect(() => {
    const fetchSports = async () => {
      const data = await sports();
      setSportsData(data.sports);
    };
    fetchSports();
  }, []);

  useEffect(() => {
    if (
      preferencesState.isLoading == false &&
      preferencesState.preferences.sports
    ) {
      setSelectedPreferences(preferencesState.preferences.sports);
    }
  }, [preferencesState.isLoading, preferencesState.preferences.sports]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedPreferences((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((item) => item !== value);
      }
    });
  };

  const submitPreferences = () => {
    updatePreferences(preferencesDispatch, selectedPreferences);
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
                <div
                  className="flex flex-col space-y-4"
                >
                  {sportsData.map((sport) => (
                    <div key={sport.id} className="flex items-center">
                      <input
                        id={`sport-${sport.id}`}
                        type="checkbox"
                        value={sport.name}
                        checked={selectedPreferences.includes(sport.name)}
                        onChange={handleCheckboxChange}
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
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500"
                    onClick={submitPreferences}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PreferencesModal;
