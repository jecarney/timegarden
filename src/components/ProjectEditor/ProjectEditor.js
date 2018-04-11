import React from "react";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";

import ProjectEditorContainer from "./ProjectEditorContainer";

import projectEditorStyle from "./ProjectEditorStyles";

const ProjectEditor = props => {
  const {
    description,
    handleChange,
    handleSubmit,
    inProgress,
    percentTime,
    projectEditorClose,
    projectName
  } = props;
  return (
    <div>
      <button onClick={projectEditorClose}>Close Editor</button>
      <form onSubmit={handleSubmit} style={projectEditorStyle.background}>
        <h2>Project Editor</h2>
        <div>
          <TextField
            name="projectName"
            type="text"
            placeholder="Enter the project name"
            value={projectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name="description"
            placeholder="Enter the post description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Checkbox
            name="inProgress"
            label="Project it?"
            checked={inProgress}
            onClick={handleChange}
          />
        </div>
        <div>
          <TextField
            name="percentTime"
            type="text"
            placeholder="Enter the percentage of your free time you'd like to work on this project"
            value={percentTime}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Add Post" />
      </form>
    </div>
  );
};

export default ProjectEditorContainer(ProjectEditor);
