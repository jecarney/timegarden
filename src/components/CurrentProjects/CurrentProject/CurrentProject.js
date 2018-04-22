import React from "react";

const CurrentProject = props => {
  const {
    age,
    avgEffortProportion,
    goalProportionEffort,
    _id,
    projectName,
    rewardToday,
    rewardThisWeek,
    snapShots
  } = props;

  const returnPercent = proportion => {
    return Math.floor(proportion * 100);
  };
  const bedStyle = returnPercent(goalProportionEffort);
  const plantStyle = returnPercent(avgEffortProportion);

  const getPlantImage = () => {
    if (age <= 1) {
      return "sprout";
    } else if (age < 2) {
      return "sprout2";
    } else if (age < 3) {
      return "lettuce";
    } else if (age > 5) {
      return "flower";
    }
  };
  const plantImage = 'url("/' + getPlantImage(_id) + '.png")';
  return (
    <div
      style={{
        height: bedStyle + "%",
        margin: "1em 0",
        backgroundImage: 'url("/soil.jpg")'
      }}
    >
      <p
        style={{
          color: "white"
        }}
      >
        projectName: {projectName}
      </p>
      <div
        style={{
          height:
            returnPercent(avgEffortProportion / goalProportionEffort) + "%",
          backgroundImage: plantImage,
          backgroundSize: "contain",
          margin: "1em 0"
        }}
      />
    </div>
  );
};

export default CurrentProject;
