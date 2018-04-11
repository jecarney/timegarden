const express = require("express");
const Router = express.Router;
const router = Router();
// const { verifyToken } = require("../middleware/auth");

const Project = require("../models/project"); //importing our model

router.post("/", (req, res) => {
  const { projectName, description, percentTime, inProgress } = req.body;
  // instantiate new project
  const project = new Project({
    projectName,
    description,
    percentTime,
    inProgress
  });
  project
    .save() //save to db
    .then(doc => {
      // send back successful project saved into db
      res.status(201).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.get("/", (req, res) => {
  Project.find()
    .then(docs => {
      res.status(200).json({
        message: "success",
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

router.put("/", (req, res) => {
  const { _id, projectName, description, percentTime, inProgress } = req.body;
  Project.findByIdAndUpdate(
    { _id },
    { projectName, description, percentTime, inProgress }
  )
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(404).send({
        message: err.message
      });
    });
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Project.findByIdAndRemove({ _id })
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

module.exports = router;
