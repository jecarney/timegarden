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
    return (
      <div>
        <Garden plants={this.props.plants} />
      </div>
    );
  }
}

export default GardenContainer;
