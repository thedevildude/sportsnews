import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Article } from "../../context/articles/types";
import { article } from "../../utils/api";
import { format } from "date-fns";

const ArticleModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [articleData, setArticleData] = useState<Article>({
    id: 0,
    title: "",
    thumbnail: "",
    sport: {
      id: 0,
      name: "",
    },
    date: "",
    summary: "",
    content: "",
    teams: [],
  });

  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate("../../");
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await article(id || "");
      setArticleData(data);
    };
    fetchArticle();
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
                {articleData.title}
              </h1>
              <div className="flex mt-2 space-x-2 text-sm text-gray-600">
                <p>{articleData.date && format(new Date(articleData.date), "yyyy-MM-dd HH:mm:ss")}</p>
                <span className="mx-1">&middot;</span>
                <span>{articleData.sport.name}</span>
              </div>
              <div className="mt-4">
                {articleData.thumbnail &&
                <img
                  className="w-full h-80 object-cover rounded-lg"
                  src={articleData.thumbnail}
                  alt={articleData.title}
                />}
              </div>
              <div className="mt-4 text-gray-500">
                {articleData.summary}
              </div>
              <div className="mt-4 text-gray-800">
                {articleData.content}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ArticleModal;
