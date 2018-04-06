const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todaysPlantSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, ref: "plant" },
  absoluteEffortHours: {
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
    type: String,//TODO: may want better validation... need a date only
    required: true
  },
  todayFreeHours: {
    type: Number,
    required: true,
    default: 0
  },
  todaysPlants: [todaysPlantSchema]
});

const SnapShot = mongoose.model("SnapShot", snapShotSchema);

module.exports = SnapShot;
