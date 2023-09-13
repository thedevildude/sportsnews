
export type PreferencesState = {
  isLoading: boolean;
  preferences: Preferences;
  isError: boolean;
  errorMessage: string;
};

export type Preferences = {
  sports: string[];
  teams: string[];
};

export type Team = {
  id: string;
  name: string;
  plays: string;
};

export enum PreferencesActionTypes {
  FETCH_PREFERENCES_REQUEST = "FETCH_PREFERENCES_REQUEST",
  FETCH_PREFERENCES_SUCCESS = "FETCH_PREFERENCES_SUCCESS",
  FETCH_PREFERENCES_FAILURE = "FETCH_PREFERENCES_FAILURE",

  UPDATE_PREFERENCES_REQUEST = "UPDATE_PREFERENCES_REQUEST",
  UPDATE_PREFERENCES_SUCCESS = "UPDATE_PREFERENCES_SUCCESS",
  UPDATE_PREFERENCES_FAILURE = "UPDATE_PREFERENCES_FAILURE",
}

export type PreferencesAction =
  | { type: PreferencesActionTypes.FETCH_PREFERENCES_REQUEST }
  | {
      type: PreferencesActionTypes.FETCH_PREFERENCES_SUCCESS;
      payload: Preferences;
    }
  | { type: PreferencesActionTypes.FETCH_PREFERENCES_FAILURE; payload: string }
  | { type: PreferencesActionTypes.UPDATE_PREFERENCES_REQUEST }
  | {
      type: PreferencesActionTypes.UPDATE_PREFERENCES_SUCCESS;
      payload: Preferences;
    }
  | { type: PreferencesActionTypes.UPDATE_PREFERENCES_FAILURE; payload: string };


export type PreferencesDispatch = React.Dispatch<PreferencesAction>;
