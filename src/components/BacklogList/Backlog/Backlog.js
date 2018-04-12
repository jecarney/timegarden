import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import BacklogStyle from "./BacklogStyles";

const Backlog = props => {
  const { erase, description, _id, name, editingProjectSelect } = props;
  return (
    <div style={BacklogStyle.background}>
      <p>{name}</p>
      <p>{description}</p>
      <RaisedButton label="Compost Seed" onClick={() => erase(_id)} />
      <RaisedButton
        label="Edit Project"
        onClick={() => editingProjectSelect(_id)}
      />
    </div>
  );
};

export default Backlog;
