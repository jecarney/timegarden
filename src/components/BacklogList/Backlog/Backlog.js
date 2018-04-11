import React from "react";
import BacklogStyle from "./BacklogStyles";
const Backlog = props => {
  const { erase, description, _id, name, editingProjectSelect } = props;
  return (
    <div style={BacklogStyle.background}>
      <p>{name}</p>
      <p>{description}</p>
      <button onClick={() => erase(_id)}>Compost Backlog</button>
      <button onClick={() => editingProjectSelect(_id)}>Edit Project</button>
    </div>
  );
};

export default Backlog;
