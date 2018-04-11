import React from "react";
import Slider from "material-ui/Slider";

import LogStyle from "./LogStyles.js";

const Log = props => {
  const {
    handleSubmit,
    logClose,
    projects,
    sliderChange,
    todayFreeHours
  } = props;
  // console.log(todaysProjects);
  return (
    <div>
      <button onClick={logClose}>Close CurrentProjects Log</button>
      <form onSubmit={handleSubmit} style={LogStyle.background}>
        <h2>CurrentProjects Log</h2>
        <span>How much free time did I have today?</span>
        <Slider
          min={0}
          max={16}
          step={0.25}
          value={todayFreeHours}
          onChange={sliderChange.bind(null, "todayFreeHours", null, null)}
        />
        <span>{todayFreeHours}</span>
        {todayFreeHours > 0 ? (
          projects.map((project, i) => (
            <div>
              <Slider
                key={project._id}
                min={0}
                max={todayFreeHours || 1}
                step={0.25}
                value={project["absoluteEffortMins"]}
                onChange={sliderChange.bind(
                  null,
                  "todaysProjects",
                  project._id,
                  "absoluteEffortMins"
                )}
              />
              <span>{project["absoluteEffortMins"]}</span>
            </div>
          ))
        ) : (
          <p>How much free time did you have today?</p>
        )}
        <input type="submit" value="Save Log" />
      </form>
    </div>
  );
};

export default Log;
