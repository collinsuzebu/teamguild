import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const isEmpty = require("is-empty");

export function authReducer(state = initialState.user, action) {
  const { type } = action;

  switch (type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        ...action.user,
        isAuthenticated: !isEmpty(action.user),
      };
    default:
      return state;
  }
}
