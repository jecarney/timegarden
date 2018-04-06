// {
//   "todayFreeHours":0,
//   "todaysPlants":[
//     {"absoluteEffortHours":0,
//       "proportionalEffortMins":0,
//       "_id":"5ab9a74828ea5f1abf2eb1ea"}
//   ],
//   "_id":"5ac66f7a2b9fc604c5fdbcc5",
//   "todaysDate":"20180405",
//   "__v":0
// }
import React from "react";
import Slider from "material-ui/Slider";

import LogStyle from "./LogStyles.js";

const Log = props => {
  const {
    handleSubmit,
    logClose,
    sliderChange,
    todayFreeHours,
    todaysPlants
  } = props;
  // console.log(todaysPlants);
  return (
    <div>
      <button onClick={logClose}>Close Garden Log</button>
      <form onSubmit={handleSubmit} style={LogStyle.background}>
        <h2>Garden Log</h2>
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
          todaysPlants.map((plant, i) => (
            <Slider
              key={plant._id}
              min={0}
              max={todayFreeHours || 1}
              step={0.25}
              value={plant["absoluteEffortHours"]}
              onChange={sliderChange.bind(
                null,
                "todaysPlants",
                plant._id,
                "absoluteEffortHours"
              )}
            />
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
