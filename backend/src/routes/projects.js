import express from "express";
import { Project } from "../models/Project";
import { AuthMiddleware } from "../auth/auth.middleware";

const router = express.Router();

// @route GET /projects
// @desc Get all projects for a specific user
// @access Private
router.get("/", AuthMiddleware, async (req, res) => {
  const CREATOR = {
    id: req.user._id,
    name: req.user.name,
  };

  // Get projects created by the logged in user
  await Project.find({ creator: CREATOR })
    .sort({ dateCreated: -1 })
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => console.error(err));
});

// @route GET /projects/id
// @desc Get a specific project by id
// @access Private
router.get("/:id", AuthMiddleware, async (req, res) => {
  var id = req.params.id;

  Project.findById(id).then((project) => res.json(project));
});

// @route POST /projects
// @desc Create a new project
// @access Private
router.post("/", AuthMiddleware, async (req, res) => {
  const CREATOR = {
    id: req.user._id,
    name: req.user.name,
  };

  const newProject = new Project({
    creator: CREATOR,
    title: req.body.title,
    todos: req.body.todos,
  });

  newProject.save().then((project) => res.json(project));
});

// @route PATCH /projects/id
// @desc Update an existing project
// @access Private
router.patch("/:id", AuthMiddleware, async (req, res) => {
  var projectFields = {
    title: req.body.title,
    todos: req.body.todos,
  };

  Project.findOneAndUpdate(
    { _id: req.params.id },
    { $set: projectFields },
    { new: true }
  )
    .then((project) => {
      res.json(project);
    })
    .catch((err) => console.error(err));
});

// @route DELETE /projects/id
// @desc Delete an existing project
// @access Private
router.delete("/:id", AuthMiddleware, async (req, res) => {
  Project.findById(req.params.id).then((project) => {
    project.remove().then(() => res.json({ success: true }));
  });
});

module.exports = router;
