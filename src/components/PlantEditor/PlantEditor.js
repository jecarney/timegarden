import React from "react";

import plantEditorStyle from "./PlantEditorStyles.js";

const PlantEditor = props => {
  const {
    description,
    handleChange,
    handleChangeCheckbox,
    handleSubmit,
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
          <input
            name="plantName"
            type="text"
            placeholder="Enter the plant name"
            value={plantName}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Enter the post description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            id="inGarden"
            name="inGarden"
            type="checkbox"
            onClick={handleChange}
          />
          <label htmlFor="inGarden">Plant it?</label>
        </div>
        <div>
          <input
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

export default PlantEditor;
