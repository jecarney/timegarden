import React from "react";

const CurrentProject = props => {
  const { avgEffortProportion, goalProportionEffort, _id, projectName } = props;
  const returnPercent = proportion => {
    return Math.floor(proportion * 100);
  };
  const bedStyle = returnPercent(goalProportionEffort);
  const plantStyle = returnPercent(avgEffortProportion);
  const getPlantImage = _id => {
    switch (_id) {
      case "5ad2a0f05ad56a2eb723a2c2":
        return "flower";
        break;
      case "5ad2a10f5ad56a2eb723a2c3":
        return "sprout";
        break;
      case "5ad2a1445ad56a2eb723a2c4":
        return "lettuce";
        break;
      default:
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
        className={"test"}
        style={{
          height:
            returnPercent(avgEffortProportion / goalProportionEffort) + "%",
          backgroundImage: plantImage,
          margin: "1em 0"
        }}
      />
    </div>
  );
};

export default CurrentProject;
