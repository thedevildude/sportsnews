import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { match } from "../../utils/api";
import { format } from "date-fns";
import { Match } from "../../context/livescore/types";

const MatchModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [matchData, setMatchData] = useState<Match>({
    id: "",
    name: "",
    location: "",
    sportName: "",
    endsAt: "",
    isRunning: false,
    teams: [],
    story: ""
  });

  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate("../../");
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await match(id || "");
      setMatchData(data);
    };
    fetchMatch();
  }, [id]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
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
                {matchData.name}
              </h1>
              <div className="flex mt-2 space-x-2 text-sm text-gray-600">
                <p>{matchData.endsAt && format(new Date(matchData.endsAt), "yyyy-MM-dd HH:mm:ss")}</p>
                <span className="mx-1">&middot;</span>
                <span>{matchData.sportName}</span>
              </div>
              <div className="mt-4 text-gray-800">
                {matchData.story}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MatchModal;
