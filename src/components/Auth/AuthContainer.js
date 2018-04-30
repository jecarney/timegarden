import React from "react";
import axios from "axios";

import { setToken } from "../../services/tokenService";

export default function AuthContainer(WrappedComponent) {
  return class extends React.Component {
    state = {
      email: "",
      password: ""
    };

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
      const { route } = this.props;
      e.preventDefault();
      const { email, password } = this.state;
      axios
        .post(`/auth/${route}`, {
          email,
          password
        })
        .then(res => {
          if (res.status === 200) {
            if (route === "login") {
              this.setLocalToken(res.data.payload);
            } else if (route === "signup") {
              this.userSet(res.data.payload);
            }
          }
        });
    };

    setLocalToken = token => {
      setToken(token);
      this.props.userGet();
    };

    userSet = user => {
      this.props.userSet(user);
    };

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.state}
            {...this.props}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            setLocalToken={this.setLocalToken}
            userSet={this.userSet}
          />
        </div>
      );
    }
  };
}
