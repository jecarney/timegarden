import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import BacklogStyle from "./BacklogStyles";

const Backlog = props => {
  const {
    editingProjectSelect,
    erase,
    description,
    _id,
    openEditor,
    projectName
  } = props;
  const getSeedImage = _id => {
    switch (_id) {
      case "5ad2a0f05ad56a2eb723a2c2":
        return "seed1";
      case "5ad2a10f5ad56a2eb723a2c3":
        return "seed2";
      case "5ad2a1445ad56a2eb723a2c4":
        return "seed3";
      default:
        return "seed1";
    }
  };

  const seedImage = "/" + getSeedImage(_id) + ".png";
  return (
    <div style={BacklogStyle.background}>
      <img
        src={seedImage}
        height="30"
        width="30"
        style={{
          float: "left",
          margin: "10px 5px"
        }}
      />
      <p>{projectName}</p>
      <p style={{ fontSize: "0.75em" }}>{description}</p>
      <RaisedButton
        style={{ margin: "5px" }}
        label="Compost Seed"
        onClick={() => erase(_id)}
      />
      <RaisedButton
        style={{ margin: "5px" }}
        label="Edit Project"
        onClick={() => {
          editingProjectSelect(_id);
          openEditor();
        }}
      />
    </div>
  );
};

export default Backlog;
