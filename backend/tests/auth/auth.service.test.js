import axios from "axios";
import querystring from "querystring";
import { getGithubToken } from "../../src/auth/auth.service";
import { GITHUB_APP_ID, GITHUB_APP_SECRET } from "../../src/config";

jest.mock("axios");

describe("getGithubToken", () => {
  const url = `https://github.com/login/oauth/access_token?client_id=${GITHUB_APP_ID}&client_secret=${GITHUB_APP_SECRET}&code=code`;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("it fetches token successfully from API", async () => {
    const data = {
      token: "token_string",
    };

    axios.post.mockResolvedValue(data);
    jest.spyOn(querystring, "parse").mockImplementation(() => {
      return { access_token: "token" };
    });

    await expect(getGithubToken({ code: "code" })).resolves.toEqual("token");

    expect(axios.post).toHaveBeenCalledWith(url);
  });
  it("it fails to fetch token from API", async () => {
    const errorMessage = "Network error";
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(getGithubToken("code")).rejects.toThrow(errorMessage);
  });
});
