/** @jsx jsx */
import * as React from 'react';
import { Route } from 'react-router';
import { css, jsx } from '@emotion/core';

export const App = () => (
  <Route path="/">
    <h1 css={css({ color: 'hotpink' })}>Hello, world!</h1>
  </Route>
);
