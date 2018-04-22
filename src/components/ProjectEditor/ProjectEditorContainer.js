import React from "react";
import axios from "axios";
import { getToken } from "../../services/tokenService";

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
      const token = getToken();
      const authHeader = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const {
        projectName,
        description,
        goalProportionEffort,
        inProgress
      } = this.state;

      const attributes = {
        projectName,
        description,
        goalProportionEffort,
        inProgress
      };

      const { editingProject } = this.props;

      if (editingProject !== null) {
        this.projectPutUpdate(attributes, editingProject, authHeader);
      } else {
        this.projectPostNew(attributes, authHeader);
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

    projectPostNew = (attributes, authHeader) => {
      const token = getToken();
      axios
        .post("/project", attributes, authHeader)
        .then(this.handleSubmitSuccess);
    };

    projectPutUpdate = (attributes, editingProject, authHeader) => {
      //for each project attribute in state, compare against editing project. if values are different, push value to new attributes.
      const newAttributes = {};
      Object.entries(attributes).forEach(([key, value]) => {
        if (editingProject[key] !== value) {
          newAttributes[key] = value;
        }
      });
      newAttributes["_id"] = editingProject._id;
      axios
        .put("/project", newAttributes, authHeader)
        .then(this.handleSubmitSuccess);
    };

    reinit = () => {
      this.setState(INITIAL_STATE);
    };

    componentDidMount() {
      if (this.props.editingProject !== null) {
        //TODO: let's check if editingProject is valid
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
