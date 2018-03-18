import React, { Component } from "react";
import axios from "axios";
import App from "./App";

class AppContainer extends Component {
  state = {
    editingPlant: null,
    plantEditorActive: false,
    plants: []
  };

  compost = _id => {
    axios.delete(`/plants/${_id}`).then(this.refresh);
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

  plantEditorOpen = () => {
    this.setState({ plantEditorActive: true });
  };

  plantEditorClose = () => {
    this.setState({
      plantEditorActive: false,
      editingPlant: null
    });
  };

  refresh = () => {
    axios.get("/plants").then(res => {
      const data = res.data;
      if (data.payload) {
        this.setState({ plants: data.payload });
      }
    });
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <App
        compost={this.compost}
        editingPlant={this.state.editingPlant}
        editingPlantDeselect={this.editingPlantDeselect}
        editingPlantSelect={this.editingPlantSelect}
        plantEditorActive={this.state.plantEditorActive}
        plantEditorClose={this.plantEditorClose}
        plantEditorOpen={this.plantEditorOpen}
        plants={this.state.plants}
        refresh={this.refresh}
      />
    );
  }
}

export default AppContainer;
