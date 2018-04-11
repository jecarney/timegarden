import React from "react";
import Slider from "material-ui/Slider";
import RaisedButton from "material-ui/RaisedButton";

import LogStyle from "./LogStyles.js";

const Log = props => {
  const {
    componentShow,
    projects,
    sliderChange,
    sliderDragStop,
    sliderChangeValue,
    todayFreeMins
  } = props;

  return (
    <div style={LogStyle.background}>
      <h2>CurrentProjects Log</h2>
      <span>How much free time did I have today?</span>
      <Slider
        min={0}
        max={16}
        step={0.25}
        value={todayFreeMins}
        onChange={sliderChange}
        onDragStop={sliderDragStop.bind(
          null,
          "todayFreeMins",
          sliderChangeValue
        )}
      />
      <p>{todayFreeMins}</p>
      {projects.map((project, i) => {
        const stateProjectEffortMins =
          project[project._id]["absoluteEffortMins"];
        return (
          <div>
            <Slider
              disabled={todayFreeMins === 0}
              key={project._id}
              min={0}
              max={todayFreeMins || 1}
              onChange={() => sliderChange}
              onDragStop={sliderDragStop.bind(
                null,
                stateProjectEffortMins,
                sliderChangeValue
              )}
              step={0.25}
              value={stateProjectEffortMins}
            />
            <p>{stateProjectEffortMins}</p>
          </div>
        );
      })}
      <RaisedButton
        label="Close"
        onClick={() => componentShow("logActive", false)}
        style={LogStyle.formButton}
      />
    </div>
  );
};

export default Log;
//  onDragStop={sliderDragStop.bind(null, "todayFreeMins", sliderValue)}
