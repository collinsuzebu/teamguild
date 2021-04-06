import { User } from "../src/models/User";
import { ProjectMarkdown } from "../src/services/gist.service";
import { getUserToken } from "../src/services/user.service";
import { decryptText } from "../src/utils";

jest.mock("../src/utils");

describe("Gist Service", () => {
  it("Ensure we have class", () => {
    const newService = new ProjectMarkdown("project_name", {
      completed: [],
      pending: [],
    });
    expect(newService).toBeInstanceOf(ProjectMarkdown);
  });

  it("Ensures that <generate()> returns string only", () => {
    const newService = new ProjectMarkdown("project_name", {
      completed: [],
      pending: [],
    });

    const res = newService.generate();
    expect(res).toMatch(/(Pending|Completed)/i);
  });
});

describe("getUserToken", async () => {
  const user = {
    _id: "5dbff32e367a343830cd2f49",
    name: "collins",
    token: "collins_token",
    __v: 0,
  };
  beforeAll(() => {
    User.findById = jest.fn().mockResolvedValue(user);
    decryptText.mockReturnValue(user.token);
  });

  it("should get user's token from db", async () => {
    const token = await getUserToken(user);
    await expect(token).toEqual(user.token);
  });
});
