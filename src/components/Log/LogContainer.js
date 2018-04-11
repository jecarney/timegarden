import React from "react";

export default function LogContainer(WrappedComponent) {
  const INITIAL_STATE = {
    sliderValue: 0
  };

  return class extends React.Component {
    state = INITIAL_STATE;

    sliderChange = (e, value) => {
      this.setState({
        sliderValue: value
      });
    };

    // reinit = () => {
    //   this.setState(INITIAL_STATE);
    // };

    render() {
      return (
        <div>
          <WrappedComponent {...this.state} sliderChange={this.sliderChange} />
        </div>
      );
    }
  };
}
