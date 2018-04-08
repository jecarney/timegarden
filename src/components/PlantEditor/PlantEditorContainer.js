import React from "react";
import axios from "axios";

export default function PlantEditorContainer(WrappedComponent) {
  const INITIAL_STATE = {
    description: "",
    inGarden: false,
    percentTime: 0,
    plantName: ""
  };

  return class extends React.Component {
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
        axios.put("/plant", newAttributes).then(this.handleSubmitSuccess);
      } else {
        axios.post("/plant", newAttributes).then(this.handleSubmitSuccess);
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
        const {
          plantName,
          description,
          percentTime,
          inGarden
        } = this.props.editingPlant;
        this.setState({ plantName, description, percentTime, inGarden });
      }
    }

    render() {
      return (
        //TODO: is there a smarter way to pass functions from HOC containers?
        <div>
          <WrappedComponent
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSubmitSuccess={this.handleSubmitSuccess}
            reinit={this.reinit}
          />
        </div>
      );
    }
  };
}
