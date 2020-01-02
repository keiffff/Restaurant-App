import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { App } from 'App';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#F8A404' },
    secondary: { main: '#D31513' },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
  },
});

const globalStyle = {
  'html, body': {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica, Neue, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmooting: 'grayscale',
    margin: 0,
    padding: 0,
    background: '#F7F8FB',
  },
};

ReactDOM.render(
  <>
    <Global styles={globalStyle} />
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </>,
  document.getElementById('root'),
);
