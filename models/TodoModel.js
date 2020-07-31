const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: Number,
  },
  deadline: {
    type: Date,
  },
  beginDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TodoItem = mongoose.model("todoItem", TodoSchema);
