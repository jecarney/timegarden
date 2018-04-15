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
  //TODO add guard to stop time spent being more than freeminsunspent
  // const absoluteEffortMinsLimit = () => {
  //   return project.absoluteEffortMins <= freeMinsUnspent
  //     ? project.absoluteEffortMins
  //     : freeMinsUnspent;
  // };

  return (
    <div
      style={{
        backgroundColor: "rgba(134, 165, 212, 0.42)",
        border: "solid 2px #6f748c",
        margin: "5px"
      }}
    >
      <p style={{ margin: "0 10px" }}>
        {"I spent " +
          project.absoluteEffortMins +
          " hours on " +
          project.projectName}
      </p>
      <Slider
        disabled={freeMinsGlobal === 0}
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
  "/project/project_log"
)(ProjectLog);
