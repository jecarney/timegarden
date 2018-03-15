import React from "react";
import seedlistStyle from "./SeedListStyles.js";

const SeedList_Layout = props => {
  //  const { projects, editingProjectID, compost } = props;
  return (
    <div style={seedlistStyle.background}>
      <p>Hi! I'm the SeedList.</p>
      {props.children}
    </div>
  );
};

export default SeedList_Layout;
