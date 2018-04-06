const express = require("express");
const Router = express.Router;
const router = Router();
// const { verifyToken } = require("../middleware/auth");

const Plant = require("../models/plant"); //importing our model

router.post("/", (req, res) => {
  const { plantName, description, percentTime, inGarden } = req.body;
  // instantiate new plant
  const plant = new Plant({
    plantName,
    description,
    percentTime,
    inGarden
  });
  plant
    .save() //save to db
    .then(doc => {
      // send back successful plant saved into db
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
  Plant.find()
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
  const { _id, plantName, description, percentTime, inGarden } = req.body;
  Plant.findByIdAndUpdate(
    { _id },
    { plantName, description, percentTime, inGarden }
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
  Plant.findByIdAndRemove({ _id })
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
