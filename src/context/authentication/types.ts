export interface AuthenticationState {
  isAuthenticated: boolean;
  authToken: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum AuthenticationActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",

  LOGOUT_REQUEST = "LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILURE = "LOGOUT_FAILURE",

  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",
}

export type AuthenticationAction =
  | { type: AuthenticationActionTypes.LOGIN_REQUEST }
  | { type: AuthenticationActionTypes.LOGIN_SUCCESS; payload: string }
  | { type: AuthenticationActionTypes.LOGIN_FAILURE; payload: string }
  | { type: AuthenticationActionTypes.LOGOUT_REQUEST }
  | { type: AuthenticationActionTypes.LOGOUT_SUCCESS }
  | { type: AuthenticationActionTypes.LOGOUT_FAILURE; payload: string }
  | { type: AuthenticationActionTypes.SIGNUP_REQUEST }
  | { type: AuthenticationActionTypes.SIGNUP_SUCCESS; payload: string }
  | { type: AuthenticationActionTypes.SIGNUP_FAILURE; payload: string };

export type AuthenticationDispatch = React.Dispatch<AuthenticationAction>;