import * as types from "./actionTypes";
import * as AuthApi from "../../api/auth";
import { startApiCall, endApiCall } from "./api";

export const getUser = () => (dispatch) => {
  dispatch(startApiCall());

  return AuthApi.getUser()
    .then((user) => {
      dispatch(endApiCall());
      dispatch({ type: types.SET_CURRENT_USER, user });
    })
    .catch((error) => {
      dispatch(endApiCall());
      throw error;
    });
};

export const logoutUser = (history) => (dispatch) => {
  // remove cookies
  AuthApi.logoutUser().then((res) => {
    dispatch({ type: types.SET_CURRENT_USER, user: {} });
  });

  history.push("/dashboard");
};
