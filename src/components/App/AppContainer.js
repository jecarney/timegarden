import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import update from "immutability-helper";

import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from 'material-ui/RaisedButton';

class AppContainer extends Component {
  state = {
    editingProject: null,
    logActive: true,
    projectEditorActive: false,
    projects: [],
    backlogListActive: false,
    todaysDate: null
  };

  erase = _id => {
    axios.erase(`/project/${_id}`).then(this.refresh);
  };

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
      const { payload } = res.data;
      if (payload) {
        this.setState({ projects: payload });
        this.snapShotGet();
      }
    });
  };

  refresh = () => {
    this.projectsGet();
    const todaysDate = moment()
      .format("YYYYMMDD")
      .toString();
    this.setState({ todaysDate });
  };

  snapShotGet = () => {
    //loop through all projects in currentProjects assigning them the values from snapShot.
    //if there's no matching id in snapshots, assign the projects default 0s for those values.
    const { projects, todaysDate } = this.state;
    axios.get(`/snapShot/${todaysDate}`).then(res => {
      const { payload } = res.data;
      const todaysProjects = [];
      if (payload) {
        const todaysProjects = payload;
      }
      const newProjects = projects.map((project, i) => {
        //if todaysProjects at the given id is missing, assign default 0s
        const snapShotProject = todaysProjects[project._id] || {
          absoluteEffortMins: 0,
          proportionalEffortMins: 0
        };
        return {
          ...project,
          ...{
            absoluteEffortMins: snapShotProject.absoluteEffortMins,
            proportionalEffortMins: snapShotProject.proportionalEffortMins
          }
        }; //shallow clone of project, needs to be udpated if project structure gets nested
      });
      this.setState({ projects: newProjects });
    });
  };

  snapShotUpdate = () => {
    const { projects, todaysDate } = this.state;
    const newSnapShot = projects.map((project, i) => {
      return {
        _id: project._id,
        absoluteEffortMins: project.absoluteEffortMins,
        proportionalEffortMins: project.proportionalEffortMins
      };
    });
    axios.post(`/snapShot/${todaysDate}`, newSnapShot).then(this.refresh());
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
          snapShotUpdate={this.snapShotUpdate}
        />
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
