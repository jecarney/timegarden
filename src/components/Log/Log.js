import React from "react";
import Slider from "material-ui/Slider";
import RaisedButton from "material-ui/RaisedButton";

import Page from "../Layout/Page";

import LogContainer_Shared from "./LogContainer_Shared";
import ProjectLog from "./ProjectLog/ProjectLog";

import LogStyle from "./LogStyles.js";

const Log = props => {
  const {
    componentShow,
    freeMinsGlobal,
    projects,
    refresh,
    sliderChange,
    sliderDragStop,
    sliderChangeValue
  } = props;

  const freeMinsUnspent = () => {
    let unspent =
      freeMinsGlobal -
      projects.reduce((acc, curr) => {
        return acc + curr.absoluteEffortMins;
      }, 0);
    return unspent > 0 ? unspent : 0;
  };

  return (
    <Page extraStyles={{ backgroundColor: "grey" }}>
      <h2>Garden Log</h2>
      <div
        style={{
          backgroundColor: "rgba(200, 214, 234, 0.42)",
          border: "solid 2px #6f748c",
          margin: "5px"
        }}
      >
        <p style={{ margin: "0 10px" }}>
          {`I had ${freeMinsGlobal} hours free today.`}
          {freeMinsUnspent() === 0 ? " All free time has been logged." : ""}
        </p>
        <Slider
          min={0}
          max={8}
          step={0.25}
          value={freeMinsGlobal}
          onChange={sliderChange.bind(null, "freeMins")}
          onDragStop={sliderDragStop.bind(null, "freeMins")}
        />
      </div>

      {projects.map((project, i) => {
        if (project.inProgress) {
          return (
            <ProjectLog
              freeMinsGlobal={freeMinsGlobal}
              key={project._id}
              project={project}
              refresh={refresh}
              freeMinsUnspent={freeMinsUnspent}
            />
          );
        }
      })}
    </Page>
  );
};

export default LogContainer_Shared(
  {
    sliderValue: 0,
    sliderChangeValue: 0,
    freeMins: 0
  },
  "/currentLog"
)(Log);
