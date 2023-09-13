import React from "react";
import Matches from "../../components/livescore";
import Article from "../../components/articles";
import { Outlet } from "react-router-dom";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";
import { useAuthenticationState } from "../../context/authentication/context";
import Favourites from "../../components/favourites";

const Home = () => {
  const preferencesDispatch = usePreferencesDispatch();
  const authenticationState = useAuthenticationState();
  React.useEffect(() => {
    authenticationState.isAuthenticated && fetchPreferences(preferencesDispatch);
  }, [authenticationState.isAuthenticated, preferencesDispatch]);
  
  return (
    <main className="flex flex-col">
      <section>
        <Matches />
      </section>
      <section className="grid grid-cols-4 space-x-4">
        <Article />
        <Favourites />
      </section>
      <Outlet />
    </main>
  )
};

export default Home;
