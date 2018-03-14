import React from "react";
import gardenStyle from "./GardenStyles.js";
import Bed from "./Bed/Bed.js";

const Garden = props => {
  const { projects } = props;
  return (
    <div style={gardenStyle.background}>
      <p>Hi! I'm the Garden.</p>
      <ul>
        {projects.map((project, i) => <Bed key={project._id} {...project} />)}
      </ul>
    </div>
  );
};

export default Garden;
