import * as types from "./actionTypes";

export function startApiCall() {
  return { type: types.API_BEGAN };
}

export function endApiCall() {
  return { type: types.API_ENDED };
}
