import { Reducer } from "react";
import { AuthenticationState, AuthenticationAction, AuthenticationActionTypes } from "./types";

export const initialState: AuthenticationState = {
  isAuthenticated: localStorage.getItem("authToken") ? true : false,
  authToken: localStorage.getItem("authToken") || "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const authenticationReducer: Reducer<AuthenticationState, AuthenticationAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthenticationActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        authToken: action.payload,
        isError: false,
        errorMessage: "",
      };
    case AuthenticationActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case AuthenticationActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthenticationActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        isError: false,
        authToken: "",
        errorMessage: "",
      };
    case AuthenticationActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case AuthenticationActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthenticationActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        authToken: action.payload,
        isError: false,
        errorMessage: "",
      };
    case AuthenticationActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}