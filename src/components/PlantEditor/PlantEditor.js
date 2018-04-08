import React from "react";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";

import PlantEditorContainer from "./PlantEditorContainer";

import plantEditorStyle from "./PlantEditorStyles";

const PlantEditor = props => {
  const {
    description,
    handleChange,
    handleSubmit,
    inGarden,
    percentTime,
    plantEditorClose,
    plantName
  } = props;
  return (
    <div>
      <button onClick={plantEditorClose}>Close Editor</button>
      <form onSubmit={handleSubmit} style={plantEditorStyle.background}>
        <h2>Plant Editor</h2>
        <div>
          <TextField
            name="plantName"
            type="text"
            placeholder="Enter the plant name"
            value={plantName}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name="description"
            placeholder="Enter the post description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Checkbox
            name="inGarden"
            label="Plant it?"
            checked={inGarden}
            onClick={handleChange}
          />
        </div>
        <div>
          <TextField
            name="percentTime"
            type="text"
            placeholder="Enter the percentage of your free time you'd like to work on this plant"
            value={percentTime}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Add Post" />
      </form>
    </div>
  );
};

export default PlantEditorContainer(PlantEditor);
