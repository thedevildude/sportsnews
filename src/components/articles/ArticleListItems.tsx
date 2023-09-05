import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { sports } from "../../utils/api";
import { ArticleListState, Sport } from "../../context/articles/types";
import { useArticleListState } from "../../context/articles/context";
import ArticleListCard from "./ArticleListCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ArticleListItems() {
  const articleListState: ArticleListState = useArticleListState();
  const [sportsData, setSportsData] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      const data = await sports();
      setSportsData(data.sports);
    };
    fetchSports();
  }, []);

  if (articleListState.isLoading) {
    return (
      <div className="text-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (articleListState.isError) {
    return (
      <div className="text-center">
        <span>{articleListState.errorMessage}</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {sportsData.map((sports) => (
            <Tab
              key={sports.id}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {sports.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {sportsData.map((sports) => (
            <Tab.Panel key={sports.id}>
              <div className="flex flex-col gap-2">
                {articleListState.articles
                  .filter((article) => article.sport.id === sports.id)
                  .map((article) => (
                    <ArticleListCard key={article.id} {...article} />
                  ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
