import React from "react";
import Slider from "material-ui/Slider";

import LogContainer_Shared from "../LogContainer_Shared";

const ProjectLog = props => {
  const {
    // absoluteEffortMins,
    freeMinsGlobal,
    freeMinsUnspent,
    project,
    sliderChange,
    sliderDragStop
  } = props;

  return (
    <div
      style={{
        backgroundColor: "rgba(134, 165, 212, 0.42)",
        border: "solid 2px #6f748c",
        margin: "5px"
      }}
    >
      <p style={{ margin: "0 10px", float: "left" }}>
        {"I spent " +
          project.absoluteEffortMins +
          " hours on " +
          project.projectName}
      </p>
      <p style={{ margin: "0 10px", float: "right", color: "#d6eff3" }}>
        {"Goal is " + project.goalProportionEffort * freeMinsGlobal + " hours."}
      </p>
      <Slider
        disabled={freeMinsUnspent() === 0}
        min={0}
        max={freeMinsGlobal || 1}
        onChange={sliderChange.bind(null, "absoluteEffortMins")}
        onDragStop={sliderDragStop.bind(null, "absoluteEffortMins")}
        step={0.25}
        value={project.absoluteEffortMins}
      />
    </div>
  );
};

export default LogContainer_Shared(
  {
    absoluteEffortMins: 0
  },
  "/project"
)(ProjectLog);
