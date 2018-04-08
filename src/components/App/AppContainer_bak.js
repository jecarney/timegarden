import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from 'material-ui/RaisedButton';

class AppContainer extends Component {
  state = {
    editingPlant: null,
    logActive: true,
    plantEditorActive: false,
    plants: [],
    seedListActive: false,
    snapShots: [],
    todaysDate: moment() //TODO: is this ok?
      .format("YYYYMMDD")
      .toString(),
    todayFreeHours: 0,
    todayFreeHoursUnspent: 0,
    todaysPlants: []
  };

  compost = _id => {
    axios.delete(`/plant/${_id}`).then(this.refresh);
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

  editingPlantSelect = _id => {
    //TODO: add error handling if can't find plant by _id
    const editingPlant = Object.assign(
      {},
      this.state.plants.find(plant => plant._id === _id)
    );
    this.setState({ editingPlant });
    this.plantEditorOpen();
  };

  editingPlantDeselect = () => {
    this.setState({ editingPlant: null });
  };

  logClose = () => {
    this.setState({
      logActive: false
    });
  };

  plantEditorOpen = () => {
    this.setState({ plantEditorActive: true });
  };

  plantEditorClose = () => {
    this.setState({
      plantEditorActive: false,
      editingPlant: null
    });
  };

  plantsGet = () => {
    axios.get("/plant").then(res => {
      const data = res.data;
      if (data.payload) {
        this.setState({ plants: data.payload });
      }
    });
  };

  refresh = () => {
    this.plantsGet();
    this.snapShotGet();
  };

  sliderChange = (name, id, attribute, e, value) => {
    // is there a more generic way to handle two-way binding of array of objects?
    if (name === "todaysPlants") {
      const { todayFreeHours, todaysPlants } = this.state;
      const updatedPlantSnapShotIndex = todaysPlants.findIndex(
        plant => plant._id === id
      );
      const updatedTodaysPlants = this.copy(todaysPlants);
      //update attribute in todaysPlants clone
      updatedTodaysPlants[updatedPlantSnapShotIndex][attribute] = value;

      this.setState({
        todaysPlants: updatedTodaysPlants
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
            todaysPlants: todaySnapShot.todaysPlants
          });
        } else {
          throw new Error("Today's snapshot doesn't exist.");
        }
      } else {
        this.snapShotPost(snapShotUpdateFromPlants);
      }
    });
  };

  snapShotToday = () => {
    snapShots.find(snapShot => {
      return snapShot.todaysDate === todaysDate;
    });
  };

  // state = {
  //   editingPlant: null,
  //   logActive: true,
  //   plantEditorActive: false,
  //   plants: [],
  //   seedListActive: false,
  //   snapShots: [],
  //   todaysDate: moment() //TODO: is this ok?
  //     .format("YYYYMMDD")
  //     .toString(),
  //   todayFreeHours: 0,
  //   todayFreeHoursUnspent: 0,
  //   todaysPlants: []
  // };

  //get all from state - if it's missing from state only set defaults
  snapShotUpdate = () => {
    const { todaysDate } = this.state;
    let snapShot = {
      todaysDate: todaysDate,
      todaysPlants: []
    };

    this.snapShotPost(updatedSnapShot);
  };

  snapShotPost = newSnapShot => {
    const { todaysDate, todaysPlants } = newSnapShot;
    axios.post("/snapShot", { todaysDate, todaysPlants }).then(this.refresh);
  };

  todayFreeHoursUnspentUpdate = () => {
    const { todayFreeHours, todaysPlants } = this.state;
    console.log(todaysPlants);
    const todayFreeHoursUsed = todaysPlants.reduce((acc, curr) => {
      acc.absoluteEffortHours + curr.absoluteEffortHours;
    }, 0);
    console.log(todayFreeHoursUsed);
    const todayFreeHoursUnspent = todayFreeHours - todayFreeHoursUsed;
    this.setState({
      todayFreeHoursUnspent: todayFreeHoursUnspent
    });
  };

  todaysPlantsRefresh = () => {
    const { plants } = this.state;
    plants.map((plant, i) => {
      if (plant.inGarden) {
        snapShot.todaysPlants.push({
          _id: plant._id
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
          compost={this.compost}
          editingPlantDeselect={this.editingPlantDeselect}
          editingPlantSelect={this.editingPlantSelect}
          logClose={this.logClose}
          plantEditorClose={this.plantEditorClose}
          plantEditorOpen={this.plantEditorOpen}
          refresh={this.refresh}
          sliderChange={this.sliderChange}
        />
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
