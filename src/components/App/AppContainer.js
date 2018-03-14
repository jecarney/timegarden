import React, { Component } from "react";
import axios from "axios";
import App from "./App";

class AppContainer extends Component {
  state = {
    projects: [],
    editingProjectID: null
  };

  refresh = () => {
    console.log("called refresh");
    axios.get("/projects").then(res => {
      const data = res.data;
      if (data.payload) {
        this.setState({ projects: data.payload });
      }
    });
  };

  compost = id => {
    console.log("deleting " + id);
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <App
        projects={this.state.projects}
        refresh={this.refresh}
        editingProjectID={this.state.editingProjectID}
        compost={this.compost}
      />
    );
  }
}

export default AppContainer;
