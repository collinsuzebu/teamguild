const NGINX_PREFIX = "/api";

export const SCOPE = process.env.REACT_APP_SCOPE || "gist";
export const BACKEND_SERVER =
  process.env.REACT_APP_BACKEND_SERVER + NGINX_PREFIX ||
  "http://localhost" + NGINX_PREFIX;
