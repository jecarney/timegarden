import React from "react";
import axios from "axios";

import PlantEditor from "./PlantEditor";

const INITIAL_STATE = {
  plantName: "",
  description: "",
  percentTime: 0,
  inGarden: false
};

class PlantEditorContainer extends React.Component {
  state = INITIAL_STATE;

  handleChange = e => {
    const { value, type, checked, name } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    this.setState({
      [name]: newValue
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { plantName, description, percentTime, inGarden } = this.state;
    const { editingPlant } = this.props;
    const newAttributes = Object.assign(
      {},
      { plantName, description, percentTime, inGarden }
    );

    if (editingPlant !== null) {
      newAttributes["_id"] = editingPlant._id;
      axios.put("/plants", newAttributes).then(this.handleSubmitSuccess);
    } else {
      axios.post("/plants", newAttributes).then(this.handleSubmitSuccess);
    }
  };

  handleSubmitSuccess = () => {
    this.props.refresh();
    this.reinit();
    this.props.plantEditorClose();
    if (this.props.editingPlant !== null) {
      this.props.editingPlantDeselect();
    }
  };

  reinit = () => {
    this.setState(INITIAL_STATE);
  };

  componentDidMount() {
    if (this.props.editingPlant !== null) {
      //TODO: let's check if editingPlant is a legit plant
      const { plantName, description, percentTime } = this.props.editingPlant;
      this.setState({ plantName, description, percentTime });
    }
  }

  render() {
    return (
      <div>
        <PlantEditor
          description={this.state.description}
          editingPlant={this.props.editingPlant}
          handleChange={this.handleChange}
          handleChangeCheckbox={this.handleChangeCheckbox}
          handleSubmit={this.handleSubmit}
          percentTime={this.state.percentTime}
          plantEditorClose={this.props.plantEditorClose}
          plantName={this.state.plantName}
          editingPlantSelect={this.props.editingPlantSelect}
          title={this.state.title}
        />
      </div>
    );
  }
}

export default PlantEditorContainer;
