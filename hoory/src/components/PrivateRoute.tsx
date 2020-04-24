import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Routes } from "../pages/routes";

const PrivateRoute = ({ isAuthenticated = false, Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={Routes.LOGIN} />
        )
      }
    />
  );
};

export default PrivateRoute;
