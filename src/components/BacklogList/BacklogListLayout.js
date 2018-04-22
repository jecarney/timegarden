import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import backloglistStyle from "./BacklogListStyles.js";

const BacklogListLayout = props => {
  const { children, componentShow, projectEditorActive } = props;
  let greyOut = projectEditorActive
    ? { display: "block" }
    : { display: "none" };
  return (
    <div style={backloglistStyle.background}>
      <div>
        <RaisedButton
          style={{ margin: "5px" }}
          label="New"
          onClick={() => componentShow("projectEditorActive", true)}
        />
        {children}
      </div>
      <div style={{ ...backloglistStyle.greyOut, ...greyOut }} />
    </div>
  );
};

export default BacklogListLayout;
