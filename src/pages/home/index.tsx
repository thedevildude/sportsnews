import React from "react";
import Matches from "../../components/livescore";
import Article from "../../components/articles";
import { Outlet } from "react-router-dom";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";

const Home = () => {
  const preferencesDispatch = usePreferencesDispatch();
  React.useEffect(() => {
    localStorage.getItem("authToken") && fetchPreferences(preferencesDispatch);
  }, [preferencesDispatch]);
  
  return (
    <main className="flex flex-col">
      <section>
        <Matches />
      </section>
      <section className="">
        <Article />
      </section>
      <Outlet />
    </main>
  )
};

export default Home;
