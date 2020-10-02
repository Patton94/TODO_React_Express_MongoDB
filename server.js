const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv/config");

const app = express();
app.use(express.json());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("MongoDB Connected");
  }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.use("/api/items", require("./routes/todos"));
app.use("/api/users", require("./routes/users"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("CLIENT/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "CLIENT", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
