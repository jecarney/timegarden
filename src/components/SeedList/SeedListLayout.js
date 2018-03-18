import React from "react";
import seedlistStyle from "./SeedListStyles.js";

const SeedListLayout = props => {
  const { children, plantEditorOpen } = props;
  return (
    <div style={seedlistStyle.background}>
      <p>Hi! I'm the SeedList.</p>
      <button onClick={() => plantEditorOpen()}>New Plant</button>
      {children}
    </div>
  );
};

export default SeedListLayout;
