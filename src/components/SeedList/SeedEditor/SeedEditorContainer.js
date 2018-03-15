import React from "react";
import axios from "axios";

import SeedEditor from "./SeedEditor";

import SeedEditorStyle from "./SeedEditorStyles.js";

class SeedEditorContainer extends React.Component {
  state = {
    title: "",
    description: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, description } = this.state;
    this.setState({
      title: "",
      description: ""
    });
    axios
      .post("/projects", {
        title,
        description
      })
      .then(this.props.refresh());
  };

  render() {
    return (
      <div>
        <SeedEditor
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          title={this.state.title}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default SeedEditorContainer;
