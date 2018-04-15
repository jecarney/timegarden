const express = require("express");
const Router = express.Router;
const router = Router();

// const CurrentLog = require("../models/currentLog");
// const Project = require("../models/project");
const SnapShot = require("../models/snapShot");

const {
  snapShotCheck,
  currentLogGet,
  currentProjectsGet,
  snapShotSaveYesterday,
  currentLogReinit,
  currentProjectsReinit
} = require("../middleware/snapShot");

router.get("/:date", (req, res) => {
  SnapShot.find()
    .limit(30)
    .then(docs => {
      res.status(200).json({ message: "success", payload: docs });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

router.get(
  "/dailyRefresh/:date",
  snapShotCheck,
  currentLogGet,
  currentProjectsGet,
  snapShotSaveYesterday,
  currentLogReinit,
  currentProjectsReinit
);

module.exports = router;
