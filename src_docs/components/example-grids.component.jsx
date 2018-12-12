import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import navItems from './nav-items';

const ExampleGrids = () => (
  <Switch>
    {
      navItems.map(item => (
        <Route
          key={item.navKey}
          path={item.navPath}
          component={item.navComponent}
        />
      ))
    }
    <Route path="*" render={() => <Redirect to={navItems[0].navPath} />} />
  </Switch>
);
export default ExampleGrids;
