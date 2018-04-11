import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from 'material-ui/RaisedButton';

class AppContainer extends Component {
  state = {
    editingProject: null,
    logActive: true,
    projectEditorActive: false,
    projects: [],
    backlogListActive: false
  };

  erase = _id => {
    axios.erase(`/project/${_id}`).then(this.refresh);
  };

  //https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
  // copy = o => {
  //   var output, v, key;
  //   output = Array.isArray(o) ? [] : {};
  //   for (key in o) {
  //     v = o[key];
  //     output[key] = typeof v === "object" ? this.copy(v) : v;
  //   }
  //   return output;
  // };

  editingProjectSelect = _id => {
    //TODO: add error handling if can't find project by _id
    const editingProject = Object.assign(
      {},
      this.state.projects.find(project => project._id === _id)
    );
    this.setState({ editingProject });
    this.projectEditorOpen();
  };

  editingProjectDeselect = () => {
    this.setState({ editingProject: null });
  };

  logClose = () => {
    this.setState({
      logActive: false
    });
  };

  projectEditorOpen = () => {
    this.setState({ projectEditorActive: true });
  };

  projectEditorClose = () => {
    this.setState({
      projectEditorActive: false,
      editingProject: null
    });
  };

  projectsGet = () => {
    axios.get("/project").then(res => {
      const data = res.data;
      if (data.payload) {
        this.setState({ projects: data.payload });
      }
    });
  };

  refresh = () => {
    this.projectsGet();
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <MuiThemeProvider>
        <App
          {...this.state}
          erase={this.erase}
          editingProjectDeselect={this.editingProjectDeselect}
          editingProjectSelect={this.editingProjectSelect}
          logClose={this.logClose}
          projectEditorClose={this.projectEditorClose}
          projectEditorOpen={this.projectEditorOpen}
          refresh={this.refresh}
          sliderChange={this.sliderChange}
        />
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
