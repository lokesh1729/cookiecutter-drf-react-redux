import React, { Component, Fragment } from "react";
import { Provider as AlertProvider } from "react-alert";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AlertTemplate from "react-alert-template-basic";

import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import Login from "./components/accounts/Login";
import Alerts from "./components/layout/Alerts";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";

import { Provider } from "react-redux";
import store, { loadUser } from "./store";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute
                    exact
                    path="/"
                    component={Home}
                  />
                  <Route
                    exact
                    path="/register"
                    component={Register}
                  />
                  <Route
                    exact
                    path="/login"
                    component={Login}
                  />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}


export default App;