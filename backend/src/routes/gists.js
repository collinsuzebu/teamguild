import express from "express";
import mongoose from "mongoose";
import { Todo } from "../models/Todo";
import { Project } from "../models/Project";
import { AuthMiddleware } from "../auth/auth.middleware";
import { getUserToken } from "../services/user.service";
import { GenerateProjectMarkdown, postGist } from "../services/gist.service";

const router = express.Router();

// @route GET /gists/export
// @desc Export a project summary as github gist.
// @access Private
router.post("/export/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  const proj = await Project.findById(id)
    .then((project) => project)
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(404).send({
          message: "Project was not found",
        });
      }
    });

  const pending = await Todo.find({
    project: id,
    status: "pending",
  }).then((todos) => todos);

  const completed = await Todo.find({
    project: id,
    status: "completed",
  }).then((todos) => todos);

  const userToken = await getUserToken(req.user);

  const g = new GenerateProjectMarkdown(proj.title, { pending, completed });
  const projectMarkdown = g.generate();

  var gist = {
    description: "Project Description Here.",
    public: false,
    files: {
      [`${proj.title}.md`]: {
        content: projectMarkdown,
      },
    },
  };
  const posted = postGist(gist, userToken);

  return res.json(posted);
});

module.exports = router;
