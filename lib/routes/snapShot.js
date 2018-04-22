const express = require("express");
const Router = express.Router;
const router = Router();
const { verifyToken } = require("../middleware/auth");

const SnapShot = require("../models/snapShot");

const {
  snapShotCheck,
  currentLogGet,
  currentProjectsGet,
  snapShotSaveYesterday,
  currentLogReinit,
  currentProjectsReinit
} = require("../middleware/snapShot");

router.get("/", verifyToken, (req, res) => {
  const { user } = req.token;
  SnapShot.find({ user: user.id })
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
  verifyToken,
  snapShotCheck,
  currentLogGet,
  currentProjectsGet,
  snapShotSaveYesterday,
  currentLogReinit,
  currentProjectsReinit
);

module.exports = router;
