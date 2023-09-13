import { Reducer } from "react";
import { PreferencesAction, PreferencesState } from "./types";

export const initialState: PreferencesState = {
  preferences: {
    sports: [],
    teams: [],
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const preferencesReducer: Reducer<PreferencesState, PreferencesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "FETCH_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "FETCH_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "UPDATE_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "UPDATE_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
