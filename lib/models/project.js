const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  goalProportionEffort: {
    type: Number,
    required: false,
    default: 0
  },
  inProgress: {
    type: Boolean,
    required: true,
    default: false
  },
  absoluteEffortMins: {
    type: Number,
    required: true,
    default: 0
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
