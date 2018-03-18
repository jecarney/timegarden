const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  plantName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  percentTime: {
    type: Number,
    required: false,
    default: 0
  }
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
