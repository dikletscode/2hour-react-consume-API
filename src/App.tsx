import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { Auth, CheckList } from "./pages";
import PrivateRoute from "./router/private";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute component={CheckList} exact path="/" />
        <Route component={Auth} exact path="/login" />
      </Switch>
    </Router>
  );
}

export default App;
