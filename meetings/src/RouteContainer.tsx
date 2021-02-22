import { HashRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { routes } from "./routes/routes";

const RouteContainer = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              path={route.path}
              exact={route.isExact}
              component={route.component}
              key={index}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};
export default RouteContainer;
