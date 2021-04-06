import { combineReducers } from "redux";
import { projectReducer } from "./project";
import { todoReducer } from "./todo";
import { apiCallReducer } from "./api";
import { authReducer } from "./auth";
import { projectExportReducer } from "./project_export";

const rootReducer = combineReducers({
  projects: projectReducer,
  projectExported: projectExportReducer,
  todos: todoReducer,
  apiCallInProgress: apiCallReducer,
  user: authReducer,
});

export { rootReducer };
