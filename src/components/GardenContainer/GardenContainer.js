import React, { Component } from 'react';
import Garden from '../GardenContainer/Garden/Garden';

class GardenContainer extends Component {
  render() {
    return (
      <div>
        <p>Hi I'm the GardenContainer</p>
        <Garden/>
      </div>
    );
  }
}

export default GardenContainer;
