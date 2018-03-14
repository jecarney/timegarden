import React, { Component } from "react";
import axios from "axios";

import Garden from "./Garden";

class GardenContainer extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get("/projects").then(res => {
      //we don't check for if res.data is there, because we'll get data as long as axios isn't broken
      if (res.data.payload) {
        this.setState({
          projects: res.data.payload
        });
      }
    });
  }

  render() {
    return (
      <div>
        <p>Hi I'm the GardenContainer</p>
        <Garden projects={this.state.projects} />
      </div>
    );
  }
}

export default GardenContainer;
