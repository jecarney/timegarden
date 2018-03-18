import React from "react";

import gardenStyle from "./GardenStyles.js";

import Bed from "./Bed/Bed.js";

const Garden = props => {
  const { plants } = props;
  return (
    <div style={gardenStyle.background}>
      <p>Hi! I'm the Garden.</p>
      <ul>
        {plants.map((plant, i) => (
          <li key={plant._id}>
            <Bed {...plant} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Garden;
