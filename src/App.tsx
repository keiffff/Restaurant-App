import * as React from 'react';
import { Route } from 'react-router';
import { RestaurantsIndexPage } from './components/Restaurants/IndexPage';

export const App = () => (
  <Route path="/">
    <RestaurantsIndexPage />
  </Route>
);
