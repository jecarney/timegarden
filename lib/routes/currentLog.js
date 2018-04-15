const express = require("express");
const Router = express.Router;
const router = Router();
// const { verifyToken } = require("../middleware/auth");

const CurrentLog = require("../models/currentLog"); //importing our model

router.get("/", (req, res) => {
  CurrentLog.findOne()
    .then(docs => {
      res.status(200).json({ message: "success", payload: docs });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

router.put("/", (req, res) => {
  const { freeMins } = req.body;
  CurrentLog.findOneAndUpdate({}, { freeMins }, { new: true })
    .then(doc => {
      res.status(200).json({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(404).send({ message: err.message });
    });
});

module.exports = router;
