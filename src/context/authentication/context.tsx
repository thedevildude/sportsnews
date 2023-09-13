import React, { createContext, useContext, useReducer } from "react";
import { authenticationReducer, initialState } from "./reducer";
import { AuthenticationState, AuthenticationDispatch } from "./types";
const AuthenticationStateContext =
  createContext<AuthenticationState>(initialState);
const AuthenticationDispatchContext = createContext<AuthenticationDispatch>(
  () => {}
);
export const AuthenticationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authenticationReducer, initialState);
  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthenticationDispatchContext.Provider>
    </AuthenticationStateContext.Provider>
  );
};

export const useAuthenticationState = () =>
  useContext(AuthenticationStateContext);
export const useAuthenticationDispatch = () =>
  useContext(AuthenticationDispatchContext);
