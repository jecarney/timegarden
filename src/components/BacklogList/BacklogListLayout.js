import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import Page from "../Layout/Page";

import Backlog from "../BacklogList/Backlog/Backlog";

import backloglistStyle from "./BacklogListStyles.js";
//TODO: rename BackLogListLayout to ProjectList, rename BackLog to Project
const BacklogListLayout = props => {
  const {
    children,
    componentShow,
    editingProjectSelect,
    erase,
    projectEditorActive,
    projects
  } = props;
  let greyOut = projectEditorActive
    ? { display: "block" }
    : { display: "none" };
  return (
    <Page extraStyles={{ backgroundColor: "#4caf50" }}>
      <RaisedButton
        style={{ margin: "5px" }}
        label="New"
        onClick={() => componentShow("projectEditorActive", true)}
      />
      {projects.map((project, i) => (
        <Backlog
          {...project}
          editingProjectSelect={editingProjectSelect}
          erase={erase}
          key={project._id}
        />
      ))}
      <div style={{ ...backloglistStyle.greyOut, ...greyOut }} />
    </Page>
  );
};

export default BacklogListLayout;
