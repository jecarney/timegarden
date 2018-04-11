import React from "react";
import backloglistStyle from "./BacklogListStyles.js";

const BacklogListLayout = props => {
  const { children, projectEditorOpen } = props;
  return (
    <div style={backloglistStyle.background}>
      <p>Hi! I'm the BacklogList.</p>
      <button onClick={() => projectEditorOpen()}>New Project</button>
      {children}
    </div>
  );
};

export default BacklogListLayout;
