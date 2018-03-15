import React from "react";

import GardenContainer from "../Garden/GardenContainer";
import SeedList_Layout from "../SeedList/SeedList_Layout";
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
      <SeedList_Layout>
        <ul>
          {projects.map((project, i) => (
            <Seed key={project._id} {...project} compost={compost} />
          ))}
        </ul>
        <SeedEditorContainer editingProjectID={editingProjectID} />
      </SeedList_Layout>
    </div>
  );
};

export default App;
