import * as types from "./actionTypes";
import * as projectApi from "../../api/project";
import { endApiCall, startApiCall } from "./api";

export function createProject(project) {
  return { type: types.CREATE_PROJECT, project };
}

export function loadProjects() {
  return function (dispatch) {
    dispatch(startApiCall());
    return projectApi
      .getProjects()
      .then((projects) => {
        dispatch(endApiCall());
        return dispatch({ type: types.LOAD_PROJECTS, projects });
      })
      .catch((error) => {
        dispatch(endApiCall());
        throw error;
      });
  };
}

export function saveProject(project) {
  return function (dispatch) {
    dispatch(startApiCall());
    return projectApi
      .saveProject(project)
      .then((savedProject) => {
        project._id
          ? dispatch({ type: types.UPDATE_PROJECT, project: savedProject })
          : dispatch({ type: types.CREATE_PROJECT, project: savedProject });
        dispatch(endApiCall());
      })
      .catch((error) => {
        dispatch(endApiCall());
        throw error;
      });
  };
}

export function deleteProject(project) {
  return function (dispatch) {
    dispatch({ type: types.DELETE_PROJECT_ASYNC, project });
    return projectApi.deleteProject(project._id);
  };
}

export function exportProject(projectId) {
  return function (dispatch) {
    dispatch(startApiCall());

    return projectApi
      .exportProject(projectId)
      .then((response) => {
        dispatch({ type: types.EXPORT_PROJECT, response });
        dispatch(endApiCall());
      })
      .catch((err) => {
        dispatch(endApiCall());
      });
  };
}
