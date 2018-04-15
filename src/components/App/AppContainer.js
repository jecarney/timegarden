import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from 'material-ui/RaisedButton';

class AppContainer extends Component {
  state = {
    backlogListActive: false,
    currentPercentEffort: 0,
    editingProject: null,
    freeMinsGlobal: 0,
    logActive: false,
    projectEditorActive: false,
    projects: [],
    snapShots: [],
    todaysDate: null
  };

  componentShow = (flag, onOff) => {
    this.setState({
      [flag]: onOff
    });
  };

  currentLogGet = () => {
    axios.get("/currentLog").then(res => {
      const { payload } = res.data;
      if (payload) {
        this.setState({ freeMinsGlobal: payload.freeMins });
      }
    });
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
    this.componentShow("projectEditorActive", true);
  };

  editingProjectDeselect = () => {
    this.setState({ editingProject: null });
  };

  projectsGet = () => {
    axios.get("/project").then(res => {
      const { payload } = res.data;
      if (payload) {
        this.setState({ projects: payload });
      }
    });
  };

  refresh = () => {
    console.log("refresh");
    this.currentLogGet();
    this.projectsGet();
    this.snapShotGet();
  };

  setSky = () => {
    const { freeMinsGlobal, projects } = this.state;
    const sumEffortMins = projects.reduce(
      (total, project) => total + project.absoluteEffortMins,
      0
    );
    this.setState({
      currentPercentEffort: sumEffortMins / freeMinsGlobal || 0
    });
  };

  snapShotDailyRefresh = todaysDate => {
    axios.get(`/snapShot/dailyRefresh/${todaysDate}`).then(this.refresh);
  };

  snapShotGet = () => {
    const { todaysDate } = this.state;
    axios.get(`/snapShot/${todaysDate}`).then(res => {
      const { payload } = res.data;
      if (payload) {
        this.setState({ snapShots: payload });
      }
      this.setSky();
    });
  };

  componentDidMount() {
    const todaysDate = parseInt(moment().format("YYYYMMDD"));
    this.setState({ todaysDate });
    this.snapShotDailyRefresh(todaysDate);
  }

  render() {
    return (
      <MuiThemeProvider>
        <App
          {...this.state}
          componentShow={this.componentShow}
          erase={this.erase}
          editingProjectDeselect={this.editingProjectDeselect}
          editingProjectSelect={this.editingProjectSelect}
          refresh={this.refresh}
          sliderChange={this.sliderChange}
          sliderDragStop={this.sliderDragStop}
        />
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
