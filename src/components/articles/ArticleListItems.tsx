import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { sports } from "../../utils/api";
import { ArticleListState, Sport } from "../../context/articles/types";
import { useArticleListState } from "../../context/articles/context";
import ArticleListCard from "./ArticleListCard";
import { usePreferencesState } from "../../context/preferences/context";
import { useAuthenticationState } from "../../context/authentication/context";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ArticleListItems() {
  const articleListState: ArticleListState = useArticleListState();
  const authenticationState = useAuthenticationState();
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const preferencesState = usePreferencesState();

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

  const filteredSports = authenticationState.isAuthenticated && preferencesState.preferences?.sports?.length > 0
    ? sportsData.filter((sport) => preferencesState.preferences.sports.includes(sport.name))
    : sportsData;

  // Filter articles based on selected sports or show all articles
  const filteredArticles = authenticationState.isAuthenticated && preferencesState.preferences?.sports?.length > 0
    ? articleListState.articles.filter((article) => preferencesState.preferences.sports.includes(article.sport.name))
    : articleListState.articles;

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {/* Tab for "Your News */}
          <Tab
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
            Your News
          </Tab>
          {
            filteredSports.map((sport) => (
              <Tab
                key={sport.id}
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
                {sport.name}
              </Tab>
            ))
          }
        </Tab.List>
        <Tab.Panels className="mt-2">
          {/* Tab panel for "Your News */}
          <Tab.Panel>
            <div className="flex flex-col gap-2">
              {filteredArticles.map((article) => (
                <ArticleListCard key={article.id} {...article} />
              ))}
            </div>
          </Tab.Panel>
          {
            filteredSports.map((sport) => (
              <Tab.Panel key={sport.id}>
                <div className="flex flex-col gap-2">
                  {filteredArticles.filter((article) => article.sport.name === sport.name).map((article) => (
                    <ArticleListCard key={article.id} {...article} />
                  ))}
                </div>
              </Tab.Panel>
            ))
          }
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
