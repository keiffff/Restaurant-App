import * as React from 'react';
import { Route } from 'react-router';
import { AppHeader } from './components/AppHeader';

export const App = () => (
  <Route path="/">
    <AppHeader />
    <h1>Hello, world!</h1>
  </Route>
);
