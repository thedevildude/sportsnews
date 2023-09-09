import { preferences } from "../../utils/api";
import { PreferencesActionTypes, PreferencesDispatch } from "./types";

export const fetchPreferences = async (dispatch: PreferencesDispatch) => {
  try {
    dispatch({ type: PreferencesActionTypes.FETCH_PREFERENCES_REQUEST });
    const response = await preferences();
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: PreferencesActionTypes.FETCH_PREFERENCES_SUCCESS,
      payload: response.preferences,
    });
  } catch (error: any) {
    dispatch({
      type: PreferencesActionTypes.FETCH_PREFERENCES_FAILURE,
      payload: error.message,
    });
  }
}