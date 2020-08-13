const express = require("express");
const router = express.Router();

const TodoItem = require("../models/TodoModel");

// GET All TodoItems
// Public

router.get("/", (req, res) => {
  TodoItem.find()
    .sort({ priority: -1 })
    .then((items) => res.json(items));
});

// Create a TodoItem
// Private

router.post("/add", (req, res) => {
  const newTodoItem = new TodoItem({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
  });

  newTodoItem.save().then((item) => res.json(item));
});

// DELETE TodoItem
// Private

router.delete("/delete/:id", (req, res) => {
  TodoItem.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ msg: "Item deleted" })))
    .catch((err) => res.status(400).json({ msg: "Something goes wrong" }));
});

// UPDATE TodoItem
// Private

router.patch("/edit/:id", (req, res) => {
  TodoItem.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        deadline: req.body.deadline,
      },
    }
  ).then(res.json({ msg: "Item udpated" }));
});

// Mark as done
// Private

router.patch("/edit/done/:id", (req, res) => {
  TodoItem.updateOne(
    { _id: req.params.id },
    {
      $set: {
        done: true,
        finishDate: Date.now(),
      },
    }
  ).then(res.json({ msg: "Task done" }));
});

module.exports = router;
