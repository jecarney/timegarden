import React from "react";
import SeedStyle from "./SeedStyles";
const Seed = props => {
  const { compost, description, _id, name, editingPlantSelect } = props;
  return (
    <div style={SeedStyle.background}>
      <p>{name}</p>
      <p>{description}</p>
      <button onClick={() => compost(_id)}>Compost Seed</button>
      <button onClick={() => editingPlantSelect(_id)}>Edit Plant</button>
    </div>
  );
};

export default Seed;
