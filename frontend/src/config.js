// import dotenv from "dotenv";

// dotenv.config({ path: `${__dirname}/../frontend.env` });

export const SCOPE = process.env.REACT_APP_SCOPE || "gist";
export const BACKEND_SERVER =
  process.env.REACT_APP_BACKEND_SERVER || "http://localhost:5000";
