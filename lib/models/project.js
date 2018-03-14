const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ""
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
