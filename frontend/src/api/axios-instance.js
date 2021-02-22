import axios from "axios";
import { BACKEND_SERVER } from "../config";

const instance = axios.create({
  withCredentials: true,
  baseURL: BACKEND_SERVER,
});

export default instance;
