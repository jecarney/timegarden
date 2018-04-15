import React from "react";
import axios from "axios";

export default function ProjectEditorContainer(WrappedComponent) {
  const INITIAL_STATE = {
    description: "",
    inProgress: false,
    goalProportionEffort: 0,
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
      // e.preventDefault();
      const {
        projectName,
        description,
        goalProportionEffort,
        inProgress
      } = this.state;
      const { editingProject } = this.props;
      const newAttributes = Object.assign(
        {},
        { projectName, description, goalProportionEffort, inProgress }
      );

      if (editingProject !== null) {
        newAttributes["_id"] = editingProject._id;
        axios
          .put("/project/project_edit", newAttributes)
          .then(this.handleSubmitSuccess);
      } else {
        axios.post("/project", newAttributes).then(this.handleSubmitSuccess);
      }
    };

    handleSubmitSuccess = () => {
      const { refresh } = this.props;
      refresh();
      this.reinit();
      this.props.componentShow("projectEditorActive", false);
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
          goalProportionEffort,
          inProgress
        } = this.props.editingProject;
        this.setState({
          projectName,
          description,
          goalProportionEffort,
          inProgress
        });
      }
    }

    render() {
      //TODO: do I need to pass props through? shouldn't, but wasn't getting them in wrappedcomponents
      return (
        <div>
          <WrappedComponent
            {...this.state}
            {...this.props}
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
