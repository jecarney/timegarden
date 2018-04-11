import React from "react";
import backloglistStyle from "./BacklogListStyles.js";

const BacklogListLayout = props => {
  const { children, componentShow } = props;
  return (
    <div style={backloglistStyle.background}>
      <p>Hi! I'm the BacklogList.</p>
      <button onClick={() => componentShow("projectEditorActive", true)}>New Project</button>
      {children}
    </div>
  );
};

export default BacklogListLayout;
