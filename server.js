const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("MongoDB Connected");
  }
);

// Access Control Allow Origin Remove
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

// Use Routes
app.use("/api/items", require("./routes/todos"));
app.use("/api/users", require("./routes/users"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
