import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import backloglistStyle from "./BacklogListStyles.js";

const BacklogListLayout = props => {
  const { children, componentShow } = props;
  return (
    <div style={backloglistStyle.background}>
      <p>Hi! I'm the BacklogList.</p>
      <RaisedButton
        label="New Project"
        onClick={() => componentShow("projectEditorActive", true)}
      />
      {children}
    </div>
  );
};

export default BacklogListLayout;
