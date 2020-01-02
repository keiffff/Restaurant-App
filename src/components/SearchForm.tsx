/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Input, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export const SearchForm = () => {
  return (
    <Input
      placeholder="キーワードで検索..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};
