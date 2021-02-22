import { AuthMiddleware } from "../../src/auth/auth.middleware";
import { AuthService } from "../../src/auth/auth.service";
import lodash from "lodash";

jest.mock("../../src/auth/auth.service", () => ({
  getSession: jest.fn(() =>
    Promise.resolve(jest.fn().mockImplementation((token) => token))
  ),
}));

describe("Authentication Middleware", () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {};
    nextFunction = jest.fn();
    mockResponse = {
      status: (code) => ({
        json: (message) => ({ code, message }),
      }),
    };
  });

  it("should forbid request without cookies", async () => {
    let result = await AuthMiddleware(mockRequest, mockResponse, nextFunction);

    expect(result.code).toBeDefined();
    expect(result.code).toBe(403);
  });

  it("it should fail with invalid token", async () => {
    let result = await AuthMiddleware(
      { cookies: "undefined" },
      mockResponse,
      nextFunction
    );
    expect(result.code).toBeDefined();
    expect(result.code).toBe(403);
  });

  // it("it should pass with valid token", async () => {
  //  jest.spyOn(lodash, 'get');
  //   await AuthMiddleware({ cookies: "token" }, mockResponse, nextFunction);
  //   expect(nextFunction).toBeCalledTimes(1);
  // });
});
