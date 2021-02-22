import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export function apiCallReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  const { type } = action;

  switch (type) {
    case types.API_BEGAN:
      return state + 1;
    case types.API_ENDED:
      return state - 1;
    default:
      return state;
  }
}
