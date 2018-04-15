import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import backloglistStyle from "./BacklogListStyles.js";

const BacklogListLayout = props => {
  const { children, componentShow } = props;
  return (
    <div style={backloglistStyle.background}>
      <RaisedButton
        style={{ margin: "5px" }}
        label="New Project"
        onClick={() => componentShow("projectEditorActive", true)}
      />
      <RaisedButton
        style={{ margin: "5px" }}
        label="Close"
        onClick={() => componentShow("backlogListActive", false)}
      />
      {children}
    </div>
  );
};

export default BacklogListLayout;
