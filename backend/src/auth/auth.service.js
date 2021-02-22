import axios from "axios";
import cleanDeep from "clean-deep";
import querystring from "querystring";
import jwt from "jsonwebtoken";
import { get } from "lodash";
import { Session } from "./auth.schema";
import { User } from "../models/User";
import { encryptText } from "../utils";
import {
  IS_LOCAL,
  COOKIE_DOMAIN,
  REFRESH_COOKIE_DURATION,
  SESSION_TOKEN_NAME,
  GITHUB_APP_ID,
  GITHUB_APP_SECRET,
  SIGNING_KEY,
} from "../config";

export async function getGithubToken({ code }) {
  const ghtoken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_APP_ID}&client_secret=${GITHUB_APP_SECRET}&code=${code}`
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  var decoded = querystring.parse(ghtoken);
  return decoded.access_token;
}

/* Get the github user */
async function getGitHubUser(access_token) {
  return axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((res) => cleanDeep(res.data))
    .catch((error) => {
      console.error(`Error getting user from GitHub. ${error}`);
      throw error;
    });
}

export class AuthService {
  constructor({ userModel = User, sessionModel = Session } = {}) {
    this.userModel = userModel;
    this.sessionModel = sessionModel;
  }

  logout(context) {
    context.req.session.destroy();
    context.res.clearCookie(SESSION_TOKEN_NAME);
    return null;
  }

  async generateSession(input) {
    try {
      const session = await this.sessionModel.create(input);
      return jwt.sign({ user: input.user, _id: session._id }, SIGNING_KEY, {
        expiresIn: "1y",
      });
    } catch (error) {
      return null;
    }
  }

  async getSession({ token }) {
    try {
      const decoded = jwt.verify(token, SIGNING_KEY);
      const session = await this.sessionModel.findById(decoded._id).lean();
      return session ? decoded : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async githubAuth(input, context) {
    const token = await getGithubToken({ code: input.code });
    const githubUser = await getGitHubUser(token);

    let user = await this.userModel
      .findOne({ githubId: String(githubUser.id) })
      .then((data) => data)
      .catch((error) => {
        console.error(
          `Error getting user from database with githubId ${githubUser.id}`
        );
        throw error;
      });

    if (user) {
      const query = { githubId: githubUser.id };
      const update = {
        $push: {
          ...cleanDeep({
            ...{
              ...githubUser,
              // Fields to not overwrite
              name:
                get(user, "name", null) ||
                get(githubUser, "name", get(githubUser, "login", null)),
            },
            avatar: githubUser.avatar_url,
            token: encryptText(token),
          }),
        },
      };
      await user.updateOne(query, update);
    }

    if (!user) {
      user = await this.userModel
        .create({
          ...cleanDeep(githubUser),
          githubId: githubUser.id,
          avatar: githubUser.avatar_url,
          name: get(
            githubUser,
            "name",
            get(githubUser, "login", "github-user")
          ),
          token: encryptText(token),
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw error;
        });
    }

    const tokenSession = await this.generateSession({
      ip: context.req.ip,
      userAgent: context.req.headers["user-agent"],
      user: { _id: user._id, name: user.name },
    });

    context.res.cookie("token", tokenSession, {
      maxAge: REFRESH_COOKIE_DURATION,
      domain: COOKIE_DOMAIN,
      httpOnly: true,
      secure: !IS_LOCAL,
    });

    return user;
  }
}
