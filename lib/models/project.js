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
  percentTime: {
    type: Number,
    required: false,
    default: 0
  },
  inProgress: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
