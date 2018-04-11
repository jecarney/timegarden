import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from 'material-ui/RaisedButton';

class AppContainer extends Component {
  state = {
    backlogListActive: false,
    editingProject: null,
    logActive: true,
    projectEditorActive: false,
    projects: [],
    sliderChangeValue: 0, //TODO: try to scope this to Log.js
    todaysDate: null,
    todayFreeMins: 0
  };

  componentShow = (flag, onOff) => {
    this.setState({
      [flag]: onOff
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

  //TODO: try to scope this to Log.js
  sliderChange = (e, value) => {
    this.setState({
      sliderChangeValue: value
    });
  };

  sliderDragStop = (stateReference, value, e) => {
    // console.log("sliderDragStop");
    // console.log("e");
    // console.log(e);
    console.log("value");
    console.log(value);
    console.log("stateReference");
    console.log(stateReference);
    this.setState({
      [stateReference]: value
    });
    this.snapShotUpdate();
  };

  snapShotGet = () => {
    //loop through all projects in currentProjects assigning them the values from snapShot.
    //if there's no matching id in snapshots, assign the projects default 0s for those values.
    const { projects, todaysDate } = this.state;
    axios.get(`/snapShot/${todaysDate}`).then(res => {
      const { payload } = res.data;
      let todaysProjects = [];
      if (payload) {
        todaysProjects = payload;
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
    console.log("snapShotUpdate called");
    const { projects, todaysDate, todayFreeMins } = this.state;
    const todaysProjects = projects.map((project, i) => {
      return {
        _id: project._id,
        absoluteEffortMins: project.absoluteEffortMins,
        proportionalEffortMins: project.proportionalEffortMins
      };
    });
    const newSnapShot = { todayFreeMins, todaysProjects };
    console.log("newSnapShot");
    console.log(newSnapShot);
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
          componentShow={this.componentShow}
          erase={this.erase}
          editingProjectDeselect={this.editingProjectDeselect}
          editingProjectSelect={this.editingProjectSelect}
          refresh={this.refresh}
          sliderChange={this.sliderChange}
          sliderDragStop={this.sliderDragStop}
          snapShotUpdate={this.snapShotUpdate}
        />
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
