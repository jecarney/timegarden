import React from "react";

const Bed = props => {
  const { percentTime, plantName } = props;
  return (
    <div>
      <p>{plantName}</p>
      <p>{percentTime}</p>
    </div>
  );
};

export default Bed;
