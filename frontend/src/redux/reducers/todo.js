import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export function todoReducer(state = initialState.todos, action) {
  const { type } = action;

  switch (type) {
    case types.LOAD_TODOS:
      return { ...state, [action.projectId]: action.todos };

    case types.CREATE_TODO:
      return {
        ...state,
        [action.projectId]: [...state[action.projectId], action.todo],
      };

    case types.UPDATE_TODO:
      return {
        ...state,
        [action.projectId]: state[action.projectId].map((key) =>
          key._id === action.todo._id ? { ...key, ...action.todo } : key
        ),
      };
    case types.DELETE_TODO:
      return {
        ...state,
        [action.projectId]: state[action.projectId].filter(
          (key) => key._id !== action.todo._id
        ),
      };
    case types.DELETE_PROJECT_ASYNC:
      var res = removeKey(action.project._id, state);
      return res;

    default:
      return state;
  }
}

const removeKey = (key, { [key]: _, ...rest }) => rest;
