import React from "react";
import axios from "axios";

export default function ProjectEditorContainer(WrappedComponent) {
  const INITIAL_STATE = {
    description: "",
    inProgress: false,
    percentTime: 0,
    projectName: ""
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
      const { projectName, description, percentTime, inProgress } = this.state;
      const { editingProject } = this.props;
      const newAttributes = Object.assign(
        {},
        { projectName, description, percentTime, inProgress }
      );

      if (editingProject !== null) {
        newAttributes["_id"] = editingProject._id;
        axios.put("/project", newAttributes).then(this.handleSubmitSuccess);
      } else {
        axios.post("/project", newAttributes).then(this.handleSubmitSuccess);
      }
    };

    handleSubmitSuccess = () => {
      const { snapShotUpdate } = this.props;
      snapShotUpdate(); //TODO: snapShotUpdate calls refresh, but would prefer to be more explicit
      this.reinit();
      this.props.projectEditorClose();
      if (this.props.editingProject !== null) {
        this.props.editingProjectDeselect();
      }
    };

    reinit = () => {
      this.setState(INITIAL_STATE);
    };

    componentDidMount() {
      if (this.props.editingProject !== null) {
        //TODO: let's check if editingProject is a legit project
        const {
          projectName,
          description,
          percentTime,
          inProgress
        } = this.props.editingProject;
        this.setState({ projectName, description, percentTime, inProgress });
      }
    }

    render() {
      return (
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
