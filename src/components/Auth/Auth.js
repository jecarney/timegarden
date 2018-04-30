//TODO: if user can't login, post message
import React, { Component } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

import AuthContainer from "./AuthContainer";

import appStyle from "../App/AppStyles.js";
import authStyle from "./AuthStyles.js";

const Auth = props => {
  const { handleChange, handleSubmit, route } = props;
  return (
    <div style={authStyle.form}>
      <div>
        <TextField
          name="email"
          type="email"
          floatingLabelText="email"
          onChange={handleChange}
          inputStyle={authStyle.authText}
        />
      </div>
      <div>
        <TextField
          type="password"
          onChange={handleChange}
          name="password"
          floatingLabelText="password"
        />
      </div>
      <div>
        <RaisedButton
          style={appStyle.button}
          labelStyle={{ ...appStyle.font, ...authStyle.authText }}
          label={route === "login" ? "Log In" : "Sign up"}
          onClick={handleSubmit}
        />
        <Link
          to={route === "login" ? "/signup" : "/login"}
          style={{
            ...appStyle.font,
            ...authStyle.authText,
            ...appStyle.link
          }}
        >
          {route === "login" ? "Sign up" : "Log In"}
        </Link>
      </div>
    </div>
  );
};

export default AuthContainer(Auth);
