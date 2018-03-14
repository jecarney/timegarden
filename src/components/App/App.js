import React from "react";

import GardenContainer from "../Garden/GardenContainer";
import SeedList from "../SeedList/SeedList";

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
      <SeedList
        projects={projects}
        refresh={refresh}
        editingProjectID={editingProjectID}
        compost={compost}
      />
    </div>
  );
};

export default App;
