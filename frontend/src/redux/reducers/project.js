import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export function projectReducer(state = initialState.projects, action) {
  const { type } = action;

  switch (type) {
    case types.CREATE_PROJECT:
      return [...state, { ...action.project }];
    case types.UPDATE_PROJECT:
      return state.map((project) => {
        return project._id === action.project._id ? action.project : project;
      });
    case types.DELETE_PROJECT_ASYNC:
      return state.filter((project) => project._id !== action.project._id);
    case types.LOAD_PROJECTS:
      return action.projects;
    case types.EXPORT_PROJECT:
      return state;
    default:
      return state;
  }
}
