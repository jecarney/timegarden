//TODO: repetition and not generalized
const moment = require("moment");

const CurrentLog = require("../models/currentLog");
const Project = require("../models/project");
const SnapShot = require("../models/snapShot");

//get current values from CurrentLog table
const currentLogGet = (req, res, next) => {
  const { user } = req.token;
  CurrentLog.findOne({ user: user.id })
    .then(docs => {
      let freeMins;
      if (docs && docs.length) {
        freeMins = docs.freeMins;
      } else {
        freeMins = 0;
      }
      req.freeMins = freeMins;
      next();
    })
    .catch(err => {
      res.status(500).json({
        message: "currentLogGet findOne failed: " + err.message
      });
    });
};

const currentLogReinit = (req, res, next) => {
  const { user } = req.token;
  CurrentLog.findOneAndUpdate(
    { user: user.id },
    { freeMins: 0 },
    { new: true, upsert: true }
  )
    .then(docs => {
      next();
    })
    .catch(err => {
      res.status(500).json({
        message: "currentLogReinit findOneAndUpdate failed: " + err.message
      });
    });
};

//get the data for the snapshot from all projects that are currently in progress
const currentProjectsGet = (req, res, next) => {
  const { user } = req.token;
  Project.find({ inProgress: true, user: user.id })
    .then(docs => {
      //loop through projects (docs) and assign absoluteeffortmins to new post for snapshots for today
      req.projects = docs.reduce((filtered, project) => {
        filtered.push({
          _id: project._id,
          absoluteEffortMins: project.absoluteEffortMins
        });
        return filtered;
      }, []);
      next();
    })
    .catch(err => {
      res.status(500).json({ message: "Project.find failed: " + err.message });
    });
};

const currentProjectsReinit = (req, res, next) => {
  const { user } = req.token;
  Project.update(
    { user: user.id },
    { absoluteEffortMins: 0 },
    { new: true, multi: true }
  )
    .then(docs => {
      res.status(200).json({
        message: "success",
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "currentProjectsReinit update failed: " + err.message
      });
    });
};

// //if yesterday's log is in place, whatever's currently in the dbs for projects and CurrentLog should be current. Else save snapshot and reinit the current values
// const snapShotCheck = (req, res, next) => {
//   const { user } = req.token;
//   const { date } = req.params;
//   const yesterday = date - 1;
//   SnapShot.findOne({ date: yesterday, user: user.id }).then(doc => {
//     if (doc) {
//       res.status(200).json({
//         message: "success"
//       });
//     } else {
//       next();
//     }
//   });
// };

//current values from projects and currentlog should be on req, save to yesterday's snapshot
const snapShotSaveYesterday = (req, res, next) => {
  // const { date } = req.params;
  const date = parseInt(moment().format("YYYYMMDD"));
  const { user } = req.token;
  const yesterday = date - 1;
  const yesterdaysSnapShot = new SnapShot({
    date: yesterday,
    freeMins: req.freeMins,
    projects: req.projects,
    user: user.id
  });
  yesterdaysSnapShot
    .save() //save to db
    .then(docs => {
      next();
    })
    .catch(err => {
      res.status(500).json({ message: "snapShotSaveYesterday " + err.message });
    });
};

module.exports = {
  currentLogGet,
  currentLogReinit,
  currentProjectsGet,
  currentProjectsReinit,
  // snapShotCheck,
  snapShotSaveYesterday
};
