import React from "react";

const Bed = props => {
  const { name, id } = props;
  return (
    <li key={id}>
      <p>{name}</p>
    </li>
  );
};

export default Bed;
