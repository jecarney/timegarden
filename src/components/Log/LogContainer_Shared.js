import React from "react";
import axios from "axios";

const LogContainer_Shared = (INITIAL_STATE, route) => WrappedComponent => {
  return class extends React.Component {
    state = INITIAL_STATE;

    sliderChange = (name, e, value) => {
      this.setState({
        [name]: value
      });
    };

    sliderDragStop = (stateReference, value, e) => {
      console.log("dragstop");
      let update = { [stateReference]: this.state[stateReference] };
      //ProjectLog needs to pass id
      if (this.props.project) {
        update._id = this.props.project._id;
      }
      axios.put(route, update).then(this.props.refresh);
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
