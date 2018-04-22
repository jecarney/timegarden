const express = require("express");
const Router = express.Router;
const router = Router();
const { verifyToken } = require("../middleware/auth");

const Project = require("../models/project"); //importing our model

router.post("/", verifyToken, (req, res) => {
  const {
    projectName,
    description,
    goalProportionEffort,
    inProgress
  } = req.body;
  const { user } = req.token;

  const project = new Project({
    projectName,
    description,
    goalProportionEffort,
    inProgress,
    progressStart: Date.now(),
    user: user.id
  });
  project
    .save() //save to db
    .then(doc => {
      // send back successful project saved into db
      res.status(201).json({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/", verifyToken, (req, res) => {
  const { user } = req.token;
  Project.find({ user: user.id })
    .then(docs => {
      res.status(200).json({ message: "success", payload: docs });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

router.put("/", verifyToken, (req, res) => {
  const { user } = req.token;
  const newAttributes = req.body;
  //if inProgress is being passed it is being changed, and if it's true than the new "planting" date is now
  if (newAttributes.inProgress) {
    newAttributes.progressStart = Date.now();
  }
  Project.findOneAndUpdate(
    { _id: newAttributes._id, user: user.id },
    newAttributes
  )
    .then(doc => {
      res.status(200).json({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(404).json({ message: err.message });
    });
});

router.delete("/:_id", verifyToken, (req, res) => {
  const { user } = req.token;
  const { _id } = req.params;
  Project.findOneAndRemove({ _id, user: user.id })
    .then(doc => {
      res.status(200).json({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
