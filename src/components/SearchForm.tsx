/** @jsx jsx */
import { ChangeEvent, FormEvent, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { Input, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

type Props = Partial<{
  query: string;
  onChangeQuery: (value: string) => void;
  onSubmit: () => void;
}>;

const formStyle = css({
  '> .MuiInput-root': {
    width: '100%',
  },
});

export const SearchForm = ({ query, onChangeQuery, onSubmit }: Props) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChangeQuery && onChangeQuery(e.currentTarget.value),
    [onChangeQuery],
  );
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      query && onSubmit && onSubmit();
    },
    [onSubmit, query],
  );

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <Input
        placeholder="キーワードで検索..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};
