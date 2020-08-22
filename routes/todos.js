const express = require("express");
const router = express.Router();
const auth = require("../jwtMiddleware");

const TodoItem = require("../models/TodoModel");
const User = require("../models/User");

// GET All TodoItems
// Private

router.get("/:userID", auth, (req, res) => {
  User.findById(req.params.userID)
    .then((user) => res.json(user.tasks))
    .catch((err) => console.log(`Data download error: ${err}`));
});

// Create a TodoItem
// Private

router.patch("/:userID/add", auth, (req, res) => {
  const newTodoItem = new TodoItem({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
  });

  User.updateOne({ _id: req.params.userID }, { $push: { tasks: newTodoItem } })
    .then(res.json(newTodoItem))
    .catch((err) => console.log(`Adding task failed: ${err}`));
});

// DELETE TodoItem
// Private

router.patch("/:userID/delete/:title", auth, (req, res) => {
  User.updateOne(
    { _id: req.params.userID },
    { $pull: { tasks: { title: req.params.title } } }
  )
    .then(res.json("Task deleted"))
    .catch((err) => console.log(`Deleting task failed: ${err}`));
});

// UPDATE TodoItem
// Private

router.patch("/:userID/edit/:title", auth, (req, res) => {
  User.updateOne(
    { _id: req.params.userID, "tasks.title": req.params.title },
    {
      $set: {
        "tasks.$.title": req.body.title,
        "tasks.$.description": req.body.description,
        "tasks.$.priority": req.body.priority,
        "tasks.$.deadline": new Date(req.body.deadline),
      },
    }
  )
    .then(res.json("Item updated"))
    .catch((err) => console.log(`Updating failed ${err}`));
});

// Mark as done
// Private

router.patch("/:userID/edit/done/:title", auth, (req, res) => {
  User.updateOne(
    { _id: req.params.userID, "tasks.title": req.params.title },
    {
      $set: {
        "tasks.$.done": true,
        "tasks.$.finishDate": new Date(Date.now()),
      },
    }
  )
    .then(res.json(`Task done!`))
    .catch((err) => console.log(`Something goes wrong ${err}`));
});

module.exports = router;
