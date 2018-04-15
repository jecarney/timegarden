import React from "react";

import currentProjectsStyle from "./CurrentProjectsStyles.js";

import CurrentProjectsContainer from "./CurrentProjectsContainer";
import CurrentProject from "./CurrentProject/CurrentProject.js";

const CurrentProjects = props => {
  const { currentProjects } = props;
  return (
    <div style={currentProjectsStyle.background}>
      {currentProjects.map((project, i) => (
        <CurrentProject key={project._id} {...project} />
      ))}
    </div>
  );
};

export default CurrentProjectsContainer(CurrentProjects);
