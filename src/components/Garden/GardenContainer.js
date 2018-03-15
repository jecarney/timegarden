import React, { Component } from "react";
import axios from "axios";

import Garden from "./Garden";

class GardenContainer extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //   };
  // }
  //

  render() {
    return (
      <div>
        <p>Hi I'm the GardenContainer</p>
        <Garden projects={this.props.projects} />
      </div>
    );
  }
}

export default GardenContainer;
