const express = require("express");
const Router = express.Router;
const router = Router();

const SnapShot = require("../models/snapShot");

router.post("/", (req, res) => {
  const { todaysDate, todaysPlants } = req.body;
  const snapShotUpdate = new SnapShot({todaysDate, todaysPlants});
  snapShotUpdate
    .save()
    .then(doc => {
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
  const { todaysDate } = req.params;
  SnapShot.find().limit(30)
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

module.exports = router;
