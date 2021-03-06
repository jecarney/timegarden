const express = require("express");
const Router = express.Router;
const router = Router();
const { findUserByEmail, issueToken } = require("../middleware/auth");
const User = require("../models/user");

router.post("/login", findUserByEmail, issueToken); //more legible way of processing requests

//localhost:8080/auth/signup
router.post("/signup", (req, res) => {
  //TODO: if user exists, do not just error out, send back something that we can show user and let them try again
  console.log("hit signup");
  const { email, password } = req.body;
  const user = new User({ email, password });
  user
    .save()
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
