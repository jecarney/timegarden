const express = require("express");
const Router = express.Router;
const router = Router();

const SnapShot = require("../models/snapShot");

router.post("/", (req, res) => {
  const { todaysDate, todayFreeMins, todaysProjects } = req.body;
  SnapShot.findOneAndUpdate(
    { todaysDate },
    {
      $set: {
        todaysDate,
        todayFreeMins,
        todaysProjects
      }
    },
    { upsert: true }
  )
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

router.get("/:todaysDate", (req, res) => {
  const { todaysDate } = req.params;
  // console.log("snapshot get todaysDate");
  // console.log(todaysDate);
  SnapShot.findOne({ todaysDate })
    .then(docs => {
      // console.log(docs);
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
