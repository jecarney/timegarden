import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import Page from "../Layout/Page";

import Backlog from "../BacklogList/Backlog/Backlog";

import backloglistStyle from "./BacklogListStyles.js";
//TODO: rename BackLogListLayout to ProjectList, rename BackLog to Project
const BacklogListLayout = props => {
  const { componentShow, editingProjectSelect, erase, projects } = props;

  const openEditor = () => {
    props.history.push("/edit");
  };

  return (
    <Page extraStyles={backloglistStyle.page}>
      <RaisedButton
        style={{ margin: "5px" }}
        label="New"
        onClick={openEditor}
      />
      {projects.map((project, i) => (
        <Backlog
          {...project}
          editingProjectSelect={editingProjectSelect}
          erase={erase}
          key={project._id}
          openEditor={openEditor}
        />
      ))}
    </Page>
  );
};

export default BacklogListLayout;
