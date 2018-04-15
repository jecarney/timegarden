const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todaysProjectSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, ref: "project" },
  absoluteEffortMins: {
    type: Number,
    required: true,
    default: 0
  }
});

const snapShotSchema = new Schema({
  date: {
    type: Number, //TODO: should switch to date
    required: true
  },
  freeMins: {
    type: Number,
    required: true,
    default: 0
  },
  projects: {
    type: [todaysProjectSchema],
    required: false
  }
});

const SnapShot = mongoose.model("SnapShot", snapShotSchema);

module.exports = SnapShot;
