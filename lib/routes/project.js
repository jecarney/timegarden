const express = require("express");
const Router = express.Router;
const router = Router();
// const { verifyToken } = require("../middleware/auth");

const Project = require("../models/project"); //importing our model

router.post("/", (req, res) => {
  const {
    projectName,
    description,
    goalProportionEffort,
    inProgress
  } = req.body;
  // instantiate new project
  const project = new Project({
    projectName,
    description,
    goalProportionEffort,
    inProgress
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

router.get("/", (req, res) => {
  console.log("get projects router");
  Project.find()
    .then(docs => {
      res.status(200).json({ message: "success", payload: docs });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

//TODO: is there a way to handle an arbitrary set of the project attributes in a route?
router.put("/project_edit", (req, res) => {
  const {
    _id,
    projectName,
    description,
    goalProportionEffort,
    inProgress
  } = req.body;
  Project.findByIdAndUpdate(
    {
      _id
    },
    { projectName, description, goalProportionEffort, inProgress }
  )
    .then(doc => {
      res.status(200).json({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(404).send({ message: err.message });
    });
});

router.put("/project_log", (req, res) => {
  const { _id, absoluteEffortMins } = req.body;
  console.log("project_log req.body");
  console.log(req.body);
  Project.findByIdAndUpdate(
    {
      _id
    },
    {
      absoluteEffortMins
    }
  )
    .then(doc => {
      res.status(200).json({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(404).send({ message: err.message });
    });
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Project.findByIdAndRemove({ _id })
    .then(doc => {
      res.status(200).json({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
