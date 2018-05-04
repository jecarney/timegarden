import React from "react";

const CurrentProject = props => {
  const {
    age,
    avgEffortProportion,
    goalProportionEffort,
    _id,
    projectName,
    rewardToday,
    rewardThisWeek
  } = props;

  const returnPercent = proportion => {
    return Math.floor(proportion * 100) + "%";
  };
  const goalPercent = returnPercent(goalProportionEffort);
  // const plantStyle = returnPercent(avgEffortProportion);

  const getPlantImage = () => {
    if (age <= 1) {
      return "sprout";
    } else if (age <= 2) {
      return "sprout2";
    } else if (age <= 3) {
      return "lettuce";
    } else if (age <= 10) {
      return "flower";
    } else {
      return "tree";
    }
  };
  const plantImage = 'url("/' + getPlantImage(_id) + '.png")';
  return (
    <div
      style={{
        height: goalPercent,
        margin: "1em 0",
        backgroundImage: 'url("/soil.jpg")',
        position: "relative"
      }}
    >
      <p
        style={{
          color: "white"
        }}
      >
        {projectName + ": "}
        {goalPercent}
      </p>
      {rewardThisWeek && <img src="raccoon.png" height="200" align="right" />}
      <div
        style={{
          height: returnPercent(avgEffortProportion / goalProportionEffort),
          backgroundImage: plantImage,
          backgroundSize: "contain"
        }}
      />
      {rewardToday && (
        <div
          style={{
            backgroundImage: 'url("/butterflies2.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
          }}
        />
      )}
    </div>
  );
};

export default CurrentProject;
