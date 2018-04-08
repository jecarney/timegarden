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
    seedListActive: false
  };

  compost = _id => {
    axios.delete(`/plant/${_id}`).then(this.refresh);
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
