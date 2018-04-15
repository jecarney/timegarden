const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentLogSchema = new Schema({
  freeMins: {
    type: Number,
    required: true,
    default: 0
  }
});

const CurrentLog = mongoose.model("CurrentLog", currentLogSchema);

module.exports = CurrentLog;
