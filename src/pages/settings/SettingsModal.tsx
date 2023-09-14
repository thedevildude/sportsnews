import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../utils/api";

const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
  });

  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate("../");
  };

  const handleUpdatePassword = async (passwords: {
    current_password: string;
    new_password: string;
  }) => {
    try {
      const { current_password, new_password } = passwords;
      const response = await updatePassword(current_password, new_password);
      if (response.status === "error") {
        throw response.message;
      }
      setSuccess(response.status);
      setError("");
    } catch (error: any) {
      setError(error);
      setSuccess("");
    }
  };

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
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <div className="mt-4">
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current Password:
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        current_password: e.target.value,
                      })
                    }
                    className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-semibold mb-2">
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        new_password: e.target.value,
                      })
                    }
                    className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
                  />
                </div>
                <button
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                  onClick={() => handleUpdatePassword(passwords)}
                >
                  Update Password
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsModal;
