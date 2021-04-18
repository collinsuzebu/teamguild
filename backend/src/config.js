import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../backend.env` });

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const SCOPE = "gist";

export const ENV = process.env.NODE_ENV || "development";

export const IS_LOCAL = ENV === "development";

export const TOKEN_COOKIE_DURATION = process.env.TOKEN_COOKIE_DURATION || 3.6e6; // 1 hour

export const REFRESH_COOKIE_DURATION =
  process.env.REFRESH_COOKIE_DURATION || 3.154e10; // 1 year

export const SESSION_TOKEN_NAME = process.env.SESSION_TOKEN_NAME || "token";

export const SESSION_AUTH_NAME = "is_authenticated";

export const DB_NAME = process.env.DB_NAME || "teamGuild";

export const MONGO_DB_CONNECTION_STRING =
  process.env.MONGO_DB_CONNECTION_STRING ||
  `mongodb://mongodb:27017/${DB_NAME}`;

export const CORS_ORIGIN = process.env.CORS_ORIGIN || FRONTEND_URL;

// iv for encryption
export const IV_PLAIN = "2~4KaQDww5Z7zN:4";

/*
 * Set this to your client application's domain
 * E.g. .example.com
 */
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || "localhost";

export const COOKIE_PATH = "/";

export const GITHUB_APP_ID = process.env.GITHUB_APP_ID || "";
export const GITHUB_APP_SECRET = process.env.GITHUB_APP_SECRET || "";

export const SIGNING_KEY = process.env.SIGNING_KEY || "";
export const TOKEN_ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || "";
