import React from "react";
import seedlistStyle from "./SeedListStyles.js";

const SeedListLayout = props => {
  return (
    <div style={seedlistStyle.background}>
      <p>Hi! I'm the SeedList.</p>
      {props.children}
    </div>
  );
};

export default SeedListLayout;
