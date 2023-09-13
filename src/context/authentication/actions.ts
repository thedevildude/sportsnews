import { signin, signup } from "../../utils/api";
import { AuthenticationActionTypes, AuthenticationDispatch } from "./types";

export const login = async (
  dispatch: AuthenticationDispatch,
  email: string,
  password: string
) => {
  try {
    dispatch({ type: AuthenticationActionTypes.LOGIN_REQUEST });
    const response = await signin(email, password);
    if (response.errors) {
      throw new Error(response.errors);
    }
    localStorage.setItem("authToken", response.auth_token);
    dispatch({
      type: AuthenticationActionTypes.LOGIN_SUCCESS,
      payload: response.auth_token,
    });
  } catch (error: any) {
    dispatch({
      type: AuthenticationActionTypes.LOGIN_FAILURE,
      payload: error.message,
    });
  }
}

export const logout = async (dispatch: AuthenticationDispatch) => {
  try {
    dispatch({ type: AuthenticationActionTypes.LOGOUT_REQUEST });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    
    dispatch({ type: AuthenticationActionTypes.LOGOUT_SUCCESS });
  } catch (error: any) {
    dispatch({
      type: AuthenticationActionTypes.LOGOUT_FAILURE,
      payload: error.message,
    });
  }
}

export const signupAuth = async (
  dispatch: AuthenticationDispatch,
  name: string,
  email: string,
  password: string,
) => {
  try {
    dispatch({ type: AuthenticationActionTypes.SIGNUP_REQUEST });
    const response = await signup(name, email, password);
    if (response.errors) {
      throw new Error(response.errors);
    }
    localStorage.setItem("authToken", response.auth_token);
    dispatch({
      type: AuthenticationActionTypes.SIGNUP_SUCCESS,
      payload: response.auth_token,
    });
  } catch (error: any) {
    dispatch({
      type: AuthenticationActionTypes.SIGNUP_FAILURE,
      payload: error.message,
    });
  }
}