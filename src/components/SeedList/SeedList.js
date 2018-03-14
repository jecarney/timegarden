import React from "react";
import seedlistStyle from "./SeedListStyles.js";
import Seed from "./Seed/Seed.js";
import SeedEditorContainer from "./SeedEditor/SeedEditorContainer";

const SeedList = props => {
  const { projects, editingProjectID, compost } = props;
  return (
    <div style={seedlistStyle.background}>
      <p>Hi! I'm the SeedList.</p>
      <ul>
        {projects.map((project, i) => (
          <Seed key={project._id} {...project} compost={compost} />
        ))}
      </ul>
      <SeedEditorContainer editingProjectID={editingProjectID} />
    </div>
  );
};

export default SeedList;
