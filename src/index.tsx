import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/core';
import { App } from './App';

const globalStyle = {
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica, Neue, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmooting: 'grayscale',
    margin: 0,
    padding: 0,
  },
};

ReactDOM.render(
  <div>
    <Global styles={globalStyle} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>,
  document.getElementById('root'),
);
