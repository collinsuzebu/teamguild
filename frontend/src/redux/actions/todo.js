import * as types from "./actionTypes";
import * as todoApi from "../../api/todo";
import { endApiCall, startApiCall } from "./api";

export function loadTodos(projectId) {
  return function (dispatch) {
    return todoApi
      .getTodos(projectId)
      .then((todos) => dispatch({ type: types.LOAD_TODOS, todos, projectId }))
      .catch((error) => {
        throw error;
      });
  };
}

export function saveTodo(projectId, todo) {
  return function (dispatch) {
    dispatch(startApiCall());
    return todoApi
      .saveTodo(projectId, todo)
      .then((savedTodo) => {
        todo._id
          ? dispatch({
              type: types.UPDATE_TODO,
              todo: savedTodo,
              projectId,
            })
          : dispatch({
              type: types.CREATE_TODO,
              todo: savedTodo,
              projectId,
            });
        dispatch(endApiCall());
      })
      .catch((error) => {
        dispatch(endApiCall());
        throw error;
      });
  };
}

export function deleteTodo(projectId, todo) {
  return function (dispatch) {
    return todoApi
      .deleteTodo(projectId, todo)
      .then((deletedTodo) =>
        dispatch({ type: types.DELETE_TODO, todo, projectId })
      );
  };
}
