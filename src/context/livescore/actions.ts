import { request } from "../../utils/api";
import { MatchListActionTypes, MatchListDispatch } from "./types";

export const fetchMatches = async (
  dispatch: MatchListDispatch
) => {
  try {
    dispatch({ type: MatchListActionTypes.FETCH_MATCHES_REQUEST });
    const response = await request("matches/", "GET");
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: MatchListActionTypes.FETCH_MATCHES_SUCCESS,
      payload: response.matches,
    });
  } catch (error: any) {
    dispatch({
      type: MatchListActionTypes.FETCH_MATCHES_FAILURE,
      payload: error.message,
    });
  }
};