import React from "react";

import currentProjectsStyle from "./CurrentProjectsStyles.js";

import CurrentProject from "./CurrentProject/CurrentProject.js";

const CurrentProjects = props => {
  const { projectedProjects } = props;
  return (
    <div style={currentProjectsStyle.background}>
      <p>Hi! I'm the CurrentProjects.</p>
      <ul>
        {projectedProjects.map((project, i) => (
          <li key={project._id}>
            <CurrentProject {...project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentProjects;
