export interface MatchListState {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface Match {
  id: string;
  name: string;
  location: string;
  sportName: string;
  startsAt?: string;
  endsAt: string;
  score?: Score
  isRunning: boolean;
  teams: Team[];
  story?: string;
}

export type Score = {
  [teamName: string]: string;
};

export type Team = {
  id: number;
  name: string;
};

export enum MatchListActionTypes {
  FETCH_MATCHES_REQUEST = "FETCH_MATCHES_REQUEST",
  FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS",
  FETCH_MATCHES_FAILURE = "FETCH_MATCHES_FAILURE",

  UPDATE_MATCH_SCORE_REQUEST = "UPDATE_MATCH_REQUEST",
  UPDATE_MATCH_SCORE_SUCCESS = "UPDATE_MATCH_SUCCESS",
  UPDATE_MATCH_SCORE_FAILURE = "UPDATE_MATCH_FAILURE",
}

export type MatchListAction =
  | { type: MatchListActionTypes.FETCH_MATCHES_REQUEST }
  | { type: MatchListActionTypes.FETCH_MATCHES_SUCCESS; payload: Match[] }
  | { type: MatchListActionTypes.FETCH_MATCHES_FAILURE; payload: string }
  | { type: MatchListActionTypes.UPDATE_MATCH_SCORE_REQUEST; }
  | { type: MatchListActionTypes.UPDATE_MATCH_SCORE_SUCCESS; payload: Match }
  | { type: MatchListActionTypes.UPDATE_MATCH_SCORE_FAILURE; payload: string };

export type MatchListDispatch = React.Dispatch<MatchListAction>;