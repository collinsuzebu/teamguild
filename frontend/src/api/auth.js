import axios from "axios";
import { BACKEND_SERVER } from "../config";

export const logoutUser = () => {
  return axios.post(BACKEND_SERVER + "/logout", {}, { withCredentials: true });
};

export const getUser = async () => {
  return axios
    .get(BACKEND_SERVER + "/users/session", { withCredentials: true })
    .then((res) => res.data.user)
    .catch((err) => console.error(err));
};

// mock responses

// export async function getUser() {
//   return {
//     info: { name: "collins" },
//   };
// }

// export async function logoutUser() {
//   return {};
// }
