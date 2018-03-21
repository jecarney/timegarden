import React, { Component } from "react";
// import axios from "axios";

import Garden from "./Garden";

class GardenContainer extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //   };
  // }
  //

  render() {
    const plantedPlants = this.props.plants.filter(plant => plant.inGarden);
    return (
      <div>
        <Garden plantedPlants={plantedPlants} />
      </div>
    );
  }
}

export default GardenContainer;
