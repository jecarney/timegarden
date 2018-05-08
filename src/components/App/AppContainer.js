import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";

import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { getToken, removeToken } from "../../services/tokenService";

// import RaisedButton from 'material-ui/RaisedButton';

class AppContainer extends Component {
  state = {
    currentPercentEffort: 0,
    editingProject: null,
    freeMinsGlobal: 0,
    projects: [],
    snapShots: [],
    todaysDate: null,
    user: null
  };

  componentShow = (flag, onOff) => {
    this.setState({
      [flag]: onOff
    });
  };

  currentLogGet = () => {
    const token = getToken();
    axios
      .get("/currentLog", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const { payload } = res.data;
        if (payload) {
          this.setState({ freeMinsGlobal: payload.freeMins });
        }
      });
  };

  erase = _id => {
    const token = getToken();
    axios
      .delete(`/project/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(this.refresh);
  };

  editingProjectSelect = _id => {
    //TODO: add error handling if can't find project by _id
    const editingProject = Object.assign(
      {},
      this.state.projects.find(project => project._id === _id)
    );
    this.setState({ editingProject });
  };

  editingProjectDeselect = () => {
    this.setState({ editingProject: null });
  };

  projectsGet = extraCallBack => {
    const token = getToken();
    axios
      .get("/project", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const { payload } = res.data;
        if (payload) {
          this.setState({ projects: payload });
          extraCallBack();
        }
      });
  };

  refresh = () => {
    this.currentLogGet();
    this.projectsGet(this.snapShotGet);
    // this.snapShotGet();
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

  userGet = () => {
    const token = getToken();
    if (token) {
      axios
        .get("/user/current", {
          // 3. Pass the token as an Authorization Header
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data.payload;
            this.userSet(user);
          }
        });
    }
  };

  userLogout = () => {
    removeToken();
    this.userSet(null);
  };

  userSet = user => {
    this.setState({ user });
  };

  snapShotDailyRefresh = () => {
    // const { todaysDate } = this.state;

    const token = getToken();
    axios
      .get("/snapShot/dailyRefresh", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res);
        // this.refresh();
      });
  };

  snapShotGet = () => {
    const token = getToken();
    const { freeMinsGlobal, projects, todaysDate, user } = this.state;
    axios
      .get("/snapShot", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const { payload } = res.data;
        if (payload) {
          // const snapShots = payload.concat({
          //   freeMins: freeMinsGlobal,
          //   projects,
          //   date: todaysDate,
          //   user
          // });
          const snapShots = [
            {
              freeMins: freeMinsGlobal,
              projects,
              date: todaysDate,
              user
            },
            ...payload
          ];
          // console.log('snapShots in snapShotGet');
          // console.log(snapShots);
          this.setState({ snapShots });
        }
        this.setSky();
      });
  };

  componentDidMount() {
    document.body.style.margin = "0"; //removing 8px auto margin
    //console.log("componentDidMount");
    this.userGet();
    const todaysDate = parseInt(moment().format("YYYYMMDD"));
    this.setState({ todaysDate });
    this.refresh();
    // this.snapShotDailyRefresh();
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
          snapShotDailyRefresh={this.snapShotDailyRefresh}
          userGet={this.userGet}
          userLogout={this.userLogout}
          userSet={this.userSet}
        />
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
