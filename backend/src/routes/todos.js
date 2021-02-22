import express from "express";
import { Todo } from "../models/Todo";
import { AuthMiddleware } from "../auth/auth.middleware";

const router = express.Router();

// @route GET todos/id
// @desc Get todos for specific project (id)
// @access Private
router.get("/:id", AuthMiddleware, (req, res) => {
  Todo.find({ project: req.params.id })
    .sort({ updatedAt: -1 })
    .then((todos) => res.json(todos));
});

// @route POST todos/
// @desc Create a todo
// @access Private
router.post("/", AuthMiddleware, (req, res) => {
  const newTodo = new Todo({
    project: req.body.project,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });

  newTodo
    .save()
    .then((todo) => res.json(todo))
    .catch((err) => console.error(err));
});

// @route PATCH todos/id
// @desc Update an existing todo
// @access Private
router.patch("/:id", AuthMiddleware, (req, res) => {
  var todoFields = {};
  todoFields.title = req.body.title;
  todoFields.description = req.body.description;
  todoFields.status = req.body.status;
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    { $set: todoFields },
    { new: true }
  )
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => console.log(err));
});

// @route POST todos/id
// @desc Delete an existing todo
// @access Private
router.delete("/:id", AuthMiddleware, (req, res) => {
  return Todo.findById(req.params.id).then((todo) => {
    todo.remove().then(() => res.json({ success: true }));
  });
});

module.exports = router;
