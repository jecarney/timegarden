const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todaysProjectSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, ref: "project" },
  absoluteEffortMins: {
    type: Number,
    required: true,
    default: 0
  },
  proportionalEffortMins: {
    type: Number,
    required: true,
    default: 0
  }
});

const snapShotSchema = new Schema({
  todaysDate: {
    type: String, //TODO: may want better validation... need a date only
    required: true
  },
  todayFreeMins: {
    type: Number,
    required: true,
    default: 0
  },
  todaysProjects: {
    type: [todaysProjectSchema],
    required: false
  }
});

const SnapShot = mongoose.model("SnapShot", snapShotSchema);

module.exports = SnapShot;
