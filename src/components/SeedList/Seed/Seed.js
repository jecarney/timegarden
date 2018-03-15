import React from "react";
import SeedStyle from "./SeedStyles";
const Seed = props => {
  const { name, description, _id, compost } = props;
  return (
    <li style={SeedStyle.background}>
      <p>{name}</p>
      <p>{description}</p>
      <button onClick={() => compost(_id)}>Compost Seed</button>
    </li>
  );
};

export default Seed;
