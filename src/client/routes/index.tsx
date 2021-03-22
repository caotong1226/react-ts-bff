import * as React from "react";
const { Suspense, lazy } = React;
import { Switch, RouterProps, Route } from "react-router-dom";
import Home from "./../components/Home";
const routes: RouterProps[] = [{ path: "/", exact: true, component: Home }];
const Routes = () => (
  <Suspense fallback={<i>loading...</i>}>
    <Switch>
      {routes.map((route) => {
        const { path, exact, component: LazyCom } = route;
        return (
          <Route
            key={path}
            exact={exact}
            path={path}
            render={() => <LazyCom />}
          />
        );
      })}
    </Switch>
  </Suspense>
);
export default Routes;
