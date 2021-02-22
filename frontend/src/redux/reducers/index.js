import { combineReducers } from "redux";
import { projectReducer } from "./project";
import { todoReducer } from "./todo";
import { apiCallReducer } from "./api";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  projects: projectReducer,
  todos: todoReducer,
  apiCallInProgress: apiCallReducer,
  user: authReducer,
});

export { rootReducer };
