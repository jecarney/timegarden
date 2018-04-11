import React from "react";

const CurrentProject = props => {
  const { percentTime, projectName } = props;
  return (
    <div>
      <p>{projectName}</p>
      <p>{percentTime}</p>
    </div>
  );
};

export default CurrentProject;
