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
    backlogListActive: false,
    snapShots: [],
    todaysDate: moment() //TODO: is this ok?
      .format("YYYYMMDD")
      .toString(),
    todayFreeHours: 0,
    todayFreeHoursUnspent: 0,
    todaysProjects: []
  };

  erase = _id => {
    axios.erase(`/project/${_id}`).then(this.refresh);
  };

  //https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
  copy = o => {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      output[key] = typeof v === "object" ? this.copy(v) : v;
    }
    return output;
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
      const data = res.data;
      if (data.payload) {
        this.setState({ projects: data.payload });
      }
    });
  };

  refresh = () => {
    this.projectsGet();
    this.snapShotGet();
  };

  sliderChange = (name, id, attribute, e, value) => {
    // is there a more generic way to handle two-way binding of array of objects?
    if (name === "todaysProjects") {
      const { todayFreeHours, todaysProjects } = this.state;
      const updatedProjectSnapShotIndex = todaysProjects.findIndex(
        project => project._id === id
      );
      const updatedTodaysProjects = this.copy(todaysProjects);
      //update attribute in todaysProjects clone
      updatedTodaysProjects[updatedProjectSnapShotIndex][attribute] = value;

      this.setState({
        todaysProjects: updatedTodaysProjects
      });
    } else {
      this.setState({
        [name]: value
      });
    }
    this.todayFreeHoursUnspentUpdate();
  };

  //TODO: need to get snapShots completely from db... this is simply a list of all snapShots for display... should essentially be read-only
  // then the broken out pieces of state are used for form control and to post back to the db
  snapShotGet = () => {
    const { todaysDate } = this.state;
    axios.get(`/snapShot/${todaysDate}`).then(res => {
      const data = res.data;
      if (data.payload.length) {
        const snapShots = data.payload;
        const todaySnapShot = this.snapShotToday();
        if (todaySnapShot) {
          this.setState({
            snapShots: snapShots,
            todayFreeHours: todaySnapShot.todayFreeHours,
            todaysProjects: todaySnapShot.todaysProjects
          });
        } else {
          throw new Error("Today's snapshot doesn't exist.");
        }
      } else {
        this.snapShotPost(snapShotUpdateFromProjects);
      }
    });
  };

  snapShotToday = () => {
    snapShots.find(snapShot => {
      return snapShot.todaysDate === todaysDate;
    });
  };

  // state = {
  //   editingProject: null,
  //   logActive: true,
  //   projectEditorActive: false,
  //   projects: [],
  //   backlogListActive: false,
  //   snapShots: [],
  //   todaysDate: moment() //TODO: is this ok?
  //     .format("YYYYMMDD")
  //     .toString(),
  //   todayFreeHours: 0,
  //   todayFreeHoursUnspent: 0,
  //   todaysProjects: []
  // };

  //get all from state - if it's missing from state only set defaults
  snapShotUpdate = () => {
    const { todaysDate } = this.state;
    let snapShot = {
      todaysDate: todaysDate,
      todaysProjects: []
    };

    this.snapShotPost(updatedSnapShot);
  };

  snapShotPost = newSnapShot => {
    const { todaysDate, todaysProjects } = newSnapShot;
    axios.post("/snapShot", { todaysDate, todaysProjects }).then(this.refresh);
  };

  todayFreeHoursUnspentUpdate = () => {
    const { todayFreeHours, todaysProjects } = this.state;
    console.log(todaysProjects);
    const todayFreeHoursUsed = todaysProjects.reduce((acc, curr) => {
      acc.absoluteEffortMins + curr.absoluteEffortMins;
    }, 0);
    console.log(todayFreeHoursUsed);
    const todayFreeHoursUnspent = todayFreeHours - todayFreeHoursUsed;
    this.setState({
      todayFreeHoursUnspent: todayFreeHoursUnspent
    });
  };

  todaysProjectsRefresh = () => {
    const { projects } = this.state;
    projects.map((project, i) => {
      if (project.inProgress) {
        snapShot.todaysProjects.push({
          _id: project._id
        });
      }
    });
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
