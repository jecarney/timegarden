import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";

import Page from "../Layout/Page";

import ProjectEditorContainer from "./ProjectEditorContainer";

import projectEditorStyle from "./ProjectEditorStyles";

const ProjectEditor = props => {
  const {
    componentShow,
    description,
    goalProportionEffort,
    handleChange,
    handleSubmit,
    inProgress,
    projectName
  } = props;
  return (
    <Page>
      <div style={projectEditorStyle.background}>
        <h1>projecteditor</h1>

        <RaisedButton
          style={{ margin: "5px" }}
          label="Save"
          onClick={handleSubmit}
        />
        <RaisedButton
          style={{ margin: "5px" }}
          label="Close"
          onClick={() => componentShow("projectEditorActive", false)}
        />
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
            label="Plant it?"
            checked={inProgress}
            onClick={handleChange}
          />
        </div>
        <div>
          <TextField
            name="goalProportionEffort"
            type="text"
            placeholder="Enter the percentage of your free time you'd like to work on this project"
            value={goalProportionEffort}
            onChange={handleChange}
          />
        </div>
      </div>
    </Page>
  );
};

export default ProjectEditorContainer(ProjectEditor);
