/** @jsx jsx */
import React from 'react';
import { AppBar } from '@material-ui/core';
import { css, jsx } from '@emotion/core';
import { Search as SearchIcon } from '@material-ui/icons';

const appBarContentStyle = css({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  color: 'white',
});

const appBarTitleStyle = css({
  margin: `0 0 0 8px`,
  fontSize: 24,
});

export const AppHeader = () => (
  <AppBar position="static">
    <div css={appBarContentStyle}>
      <SearchIcon />
      <h1 css={appBarTitleStyle}>レストランを探す</h1>
    </div>
  </AppBar>
);
