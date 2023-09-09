import * as React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";

const AccountLayout = () => {
  const preferencesDispatch = usePreferencesDispatch();
  React.useEffect(() => {
    fetchPreferences(preferencesDispatch);
  }, [preferencesDispatch]);
  
  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
