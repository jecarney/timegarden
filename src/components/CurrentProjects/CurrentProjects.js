import React from "react";

import Page from "../Layout/Page";

import CurrentProjectsContainer from "./CurrentProjectsContainer";
import CurrentProject from "./CurrentProject/CurrentProject.js";

const CurrentProjects = props => {
  const { currentProjects } = props;
  return (
    <Page extraStyles={{ backgroundImage: 'url("/grass.jpg")' }}>
      {currentProjects.map((project, i) => (
        <CurrentProject key={project._id} {...project} />
      ))}
    </Page>
  );
};

export default CurrentProjectsContainer(CurrentProjects);
