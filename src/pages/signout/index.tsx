import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticationDispatch } from "../../context/authentication/context";
import { logout } from "../../context/authentication/actions";

const Signout = () => {
  const authenticationDispatch = useAuthenticationDispatch();
  useEffect(() => {
    logout(authenticationDispatch);
  }, [authenticationDispatch]);

  return <Navigate to="/" />;
};

export default Signout;