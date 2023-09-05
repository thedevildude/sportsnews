import { match, matches } from "../../utils/api";
import { Match, MatchListActionTypes, MatchListDispatch } from "./types";

export const fetchMatches = async (dispatch: MatchListDispatch) => {
  try {
    dispatch({ type: MatchListActionTypes.FETCH_MATCHES_REQUEST });
    const response = await matches();
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: MatchListActionTypes.FETCH_MATCHES_SUCCESS,
      payload: response.matches,
    });
    response.matches.forEach((match: Match) => {
      fetchUpdatedMatchScore(dispatch, match.id.toString());
    });
  } catch (error: any) {
    dispatch({
      type: MatchListActionTypes.FETCH_MATCHES_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchUpdatedMatchScore = async (
  dispatch: MatchListDispatch,
  matchId: string
) => {
  try {
    dispatch({ type: MatchListActionTypes.UPDATE_MATCH_SCORE_REQUEST });
    const response = await match(matchId);
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: MatchListActionTypes.UPDATE_MATCH_SCORE_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: MatchListActionTypes.UPDATE_MATCH_SCORE_FAILURE,
      payload: error.message,
    });
  }
};
