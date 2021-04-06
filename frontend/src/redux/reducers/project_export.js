import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export function projectExportReducer(
  state = initialState.lastExportedGist,
  action
) {
  const { type } = action;

  switch (type) {
    case types.EXPORT_PROJECT:
      return action.response.html_url;
    default:
      return state;
  }
}
