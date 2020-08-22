const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../jwtMiddleware");
require("dotenv/config");

const User = require("../models/User");

// Register new user
// Public

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) res.json({ msg: "User already exist" });
  });

  // Create new user
  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });

  newUser.save().then((user) => {
    jwt.sign(
      { id: user.id },
      process.env.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          msg: "OK",
        });
      }
    );
  });
});

// Login
// Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) res.json({ msg: "User does not exist" });

    // Validate password

    if (password !== user.password) {
      res.json({ msg: "Invalid credentials" });
    } else {
      jwt.sign(
        { id: user.id },
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            msg: "OK",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    }
  });
});

// Get user data

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
