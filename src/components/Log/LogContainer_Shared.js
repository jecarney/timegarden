import React from "react";
import axios from "axios";
import { getToken } from "../../services/tokenService";

const LogContainer_Shared = (INITIAL_STATE, route) => WrappedComponent => {
  return class extends React.Component {
    state = INITIAL_STATE;

    sliderChange = (name, e, value) => {
      this.setState({
        [name]: value
      });
    };

    sliderDragStop = (stateReference, value, e) => {
      const token = getToken();
      const authHeader = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let newAttributes = { [stateReference]: this.state[stateReference] };
      //ProjectLog needs to pass id
      if (this.props.project) {
        newAttributes._id = this.props.project._id;
      }
      axios.put(route, newAttributes, authHeader).then(this.props.refresh);
    };

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.state}
            {...this.props}
            currentLogGet={this.currentLogGet}
            sliderChange={this.sliderChange}
            sliderDragStop={this.sliderDragStop}
          />
        </div>
      );
    }
  };
};
export default LogContainer_Shared;
