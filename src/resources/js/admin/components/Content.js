import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../routes";
import Loader from "./Loader";

const Content = () => {
  return (
    <div className="relative flex-1 overflow-auto p-8">
      <Suspense fallback={<Loader />}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.component />}
            />
          ))}
        </Switch>
      </Suspense>
    </div>
  );
};

export default Content;
