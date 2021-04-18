import supertest from "supertest";
import mongoose from "mongoose";
import { AuthMiddleware } from "../../src/auth/auth.middleware";
import { Project } from "../../src/models/Project";
import { User } from "../../src/models/User";

jest.setTimeout(9000);
jest.mock("../../src/auth/auth.middleware");

let app;

beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/teamGuildTest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
    () => done();
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("Index Route /", () => {
  beforeEach(() => {
    app = require("../../src/app");
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it("should call res.redirect", (done) => {
    supertest(app)
      .get("/")
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

// Projects
describe("Projects", () => {
  beforeEach(() => {
    // let middleware = require("../../src/auth/auth.middleware");

    const mockGetSession = jest.fn();

    AuthMiddleware.prototype.getSession = mockGetSession;
    mockGetSession.mockReturnValue(Promise.resolve({ user: {} }));

    app = require("../../src/app");
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it("GET /projects", async () => {
    const project = await Project.create({
      title: "Project 1",
      creator: "collins",
    });

    const user = await User.create({
      name: "collins",
      githubId: "123abc",
      token: "token",
    });

    await supertest(app)
      .get("/projects")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);

        // Check the response data
        expect(response.body[0]._id).toBe(project._id);
        expect(response.body[0].title).toBe(project.title);
      });
  });

  it("GET - a specific project by id - /projects/:id", async () => {
    const project = await Project.create({
      title: "Project 1",
      creator: "collins",
    });

    await supertest(app)
      .get("/projects/" + project.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(project.id);
        expect(response.body.title).toBe(project.title);
        expect(response.body.creator).toBe(post.creator);
      });
  });

  it("POST /projects", async () => {
    const data = {
      title: "project 1",
    };

    await supertest(app)
      .post("/projects")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body._id).toBeTruthy();
        expect(response.body.title).toBe(data.title);

        // assert data persistence in db
        const project = await Project.findOne({
          _id: response.body._id,
        });
        expect(project).toBeTruthy();
        expect(project.title).toBe(data.title);
      });
  });

  it("PATCH /projects/:id", async () => {
    const project = await Project.create({
      title: "project 1",
      creator: "collins",
    });

    const data = {
      title: "proejct 1 modified",
    };

    await supertest(app)
      .patch("/projects/" + project.id)
      .send(data)
      .expect(2)
      .then(async (response) => {
        expect(response.body._id).toBe(projct.id);
        expect(response.body.title).toBe(data.title);

        const newProj = await Project.findOne({ _id: response.body._id });
        expect(newProj).toBeTruthy();
        expect(newProj.title).toBe(data.title);
      });
  });
});
