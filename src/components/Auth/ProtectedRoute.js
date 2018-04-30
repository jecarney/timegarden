import React from "react";
import {
  // BrowserRouter as Router,
  // Link,
  Route,
  Redirect
  // Switch
} from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/Login" />
      )
    }
  />
);

export default ProtectedRoute;
