import React from "react";

import GardenContainer from "../Garden/GardenContainer";
import SeedListLayout from "../SeedList/SeedListLayout";
import PlantEditorContainer from "../PlantEditor/PlantEditorContainer";
import Seed from "../SeedList/Seed/Seed";

const App = props => {
  const {
    compost,
    editingPlant,
    editingPlantDeselect,
    editingPlantSelect,
    plantEditorActive,
    plantEditorOpen,
    plantEditorClose,
    plants,
    refresh
  } = props;

  if (plantEditorActive) {
    return (
      <div className="App">
        <PlantEditorContainer
          editingPlant={editingPlant}
          editingPlantDeselect={editingPlantDeselect}
          refresh={refresh}
          plantEditorClose={plantEditorClose}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>TimeGarden</h1>
        <GardenContainer
          plants={plants}
          refresh={refresh}
          editingPlant={editingPlant}
        />
        <SeedListLayout plantEditorOpen={plantEditorOpen} plants={plants}>
          <ul>
            {plants.map((plant, i) => (
              <li key={plant._id}>
                <Seed
                  {...plant}
                  compost={compost}
                  editingPlantSelect={editingPlantSelect}
                />
              </li>
            ))}
          </ul>
        </SeedListLayout>
      </div>
    );
  }
};

export default App;
