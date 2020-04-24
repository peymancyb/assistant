import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { IStoreState } from "./store/reducers";
import PrivateRoute from "./components/PrivateRoute";
import ApplicationRoutes, { Routes } from "./pages/routes";

interface IAppProps {
  isAuthenticated: boolean;
}

function App({ isAuthenticated }: IAppProps) {
  return (
    <Router>
      <Switch>
        {ApplicationRoutes.map((currentRoute) => {
          const { isPrivate, Component, route, exact } = currentRoute;
          return isPrivate ? (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              Component={Component}
              path={route}
              key={route}
              exact={exact}
            />
          ) : (
            <Route
              key={route}
              component={Component}
              path={route}
              exact={exact}
            />
          );
        })}
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(App);
