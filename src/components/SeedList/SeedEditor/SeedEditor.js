import React from "react";

import seedEditorStyle from "./SeedEditorStyles.js";

const SeedEditor = props => {
  const { handleSubmit, handleChange, title, description } = props;
  return (
    <form onSubmit={handleSubmit} style={seedEditorStyle.background}>
      <h2>Seed Editor</h2>
      <div>
        <input
          name="title"
          type="text"
          placeholder="Enter the post title"
          value={title}
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
      <input type="submit" value="Add Post" />
    </form>
  );
};

export default SeedEditor;
