import React, { Component } from "react";
// import axios from "axios";

import CurrentProjects from "./CurrentProjects";

class CurrentProjectsContainer extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //   };
  // }
  //

  render() {
    const projectedProjects = this.props.projects.filter(project => project.inProgress);
    return (
      <div>
        <CurrentProjects projectedProjects={projectedProjects} />
      </div>
    );
  }
}

export default CurrentProjectsContainer;
