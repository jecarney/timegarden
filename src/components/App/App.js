import React from "react";

import GardenContainer from "../Garden/GardenContainer";
import Log from "../Log/Log";
import PlantEditor from "../PlantEditor/PlantEditor";
import Seed from "../SeedList/Seed/Seed";
import SeedListLayout from "../SeedList/SeedListLayout";

const App = props => {
  const {
    compost,
    editingPlant,
    editingPlantDeselect,
    editingPlantSelect,
    logActive,
    logClose,
    plantEditorActive,
    plantEditorOpen,
    plantEditorClose,
    plants,
    refresh,
    seedListActive,
    sliderChange,
    todayFreeHours,
    todaysPlants
  } = props;

  if (plantEditorActive) {
    return (
      <div className="App">
        <PlantEditor
          editingPlant={editingPlant}
          editingPlantDeselect={editingPlantDeselect}
          refresh={refresh}
          plantEditorClose={plantEditorClose}
        />
      </div>
    );
  } else if (seedListActive) {
    return (
      <div className="App">
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
  } else {
    return (
      <div className="App">
        <h1>TimeGarden</h1>
        {logActive ? (
          <div>
            <Log
              logClose={logClose}
              plants={plants}
              sliderChange={sliderChange}
              todayFreeHours={todayFreeHours}
              todaysPlants={todaysPlants}
            />
            <GardenContainer
              plants={plants}
              refresh={refresh}
              editingPlant={editingPlant}
            />
          </div>
        ) : (
          <GardenContainer
            plants={plants}
            refresh={refresh}
            editingPlant={editingPlant}
          />
        )}
      </div>
    );
  }
};

export default App;
