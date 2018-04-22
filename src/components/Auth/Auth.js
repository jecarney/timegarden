//TODO: if user can't login, post message
import React, { Component } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

import AuthContainer from "./AuthContainer";

import AuthStyle from "./AuthStyles.js";

const Auth = props => {
  const { handleChange, handleSubmit, route } = props;
  return (
    <div style={AuthStyle.form}>
      <div>
        <TextField
          name="email"
          type="email"
          placeholder="example@email.com"
          onChange={handleChange}
          style={AuthStyle.textArea}
        />
      </div>
      <div>
        <TextField
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="password"
        />
      </div>
      <div>
        <RaisedButton
          style={{ margin: "5px" }}
          label={route === "login" ? "Log In" : "Sign up"}
          onClick={handleSubmit}
        />
        {route === "login" && (
          <Link to="/signup" style={AuthStyle.links}>
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthContainer(Auth);
