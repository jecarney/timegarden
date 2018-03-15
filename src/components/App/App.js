import React from "react";

import GardenContainer from "../Garden/GardenContainer";
import SeedListLayout from "../SeedList/SeedListLayout";
import SeedEditorContainer from "../SeedList/SeedEditor/SeedEditorContainer";
import Seed from "../SeedList/Seed/Seed";

const App = props => {
  const { projects, refresh, editingProjectID, compost } = props;
  return (
    <div className="App">
      <h1>TimeGarden</h1>
      <GardenContainer
        projects={projects}
        refresh={refresh}
        editingProjectID={editingProjectID}
      />
      <SeedListLayout>
        <ul>
          {projects.map((project, i) => (
            <Seed key={project._id} {...project} compost={compost} />
          ))}
        </ul>
        <SeedEditorContainer
          editingProjectID={editingProjectID}
          refresh={refresh}
        />
      </SeedListLayout>
    </div>
  );
};

export default App;
