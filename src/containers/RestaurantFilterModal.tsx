/** @jsx jsx */
import { ChangeEvent, useCallback, useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { Checkbox, FormControlLabel, MenuItem, Modal, Select } from '@material-ui/core';
import { SearchForm } from 'components/SearchForm';
import { FilterRestaurantContext } from 'contexts/filterRestaurant';

type Props = {
  open: boolean;
  onClose: () => void;
};

const rangeItems = [
  { label: '', value: '' },
  { label: '200', value: 200 },
  { label: '400', value: 400 },
  { label: '600', value: 600 },
  { label: '800', value: 800 },
  { label: '1000', value: 1000 },
];

const modalStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const contentWrapperStyle = css({
  background: 'white',
  padding: 16,
  margin: 16,
  outline: 'none',
  borderRadius: 5,
});

const searchFormWrapperStyle = css({
  marginBottom: 12,
});

const checkboxesWrapperStyle = css({
  marginBottom: 12,
});

const rangeSelectStyle = css({
  '.MuiInput-root': {
    margin: `0 4px`,
  },
  '&:before': {
    content: '"ここから"',
  },
  '&:after': {
    content: '"m 以内"',
  },
  marginBottom: 12,
});

export const RestarantFilterModal = ({ open, onClose }: Props) => {
  const { filterState, filterDispatch } = useContext(FilterRestaurantContext);
  const handleTogglePrivateRoom = useCallback(() => filterDispatch({ type: 'togglePrivateRoom' }), [filterDispatch]);
  const handleToggleLunch = useCallback(() => filterDispatch({ type: 'toggleLunch' }), [filterDispatch]);
  const handleToggleWebReserve = useCallback(() => filterDispatch({ type: 'toggleWebReserve' }), [filterDispatch]);
  const handleToggleBuffet = useCallback(() => filterDispatch({ type: 'toggleBuffet' }), [filterDispatch]);
  const handleToggleBottomLessCup = useCallback(() => filterDispatch({ type: 'toggleBottomLessCup' }), [
    filterDispatch,
  ]);
  const handleChangeQuery = useCallback((value: string) => filterDispatch({ type: 'changeQuery', payload: value }), [
    filterDispatch,
  ]);
  const handleChangeRange = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => filterDispatch({ type: 'changeRange', payload: Number(e.target.value) }),
    [filterDispatch],
  );

  return (
    <Modal css={modalStyle} open={open} onClose={onClose}>
      <div css={contentWrapperStyle}>
        <div css={searchFormWrapperStyle}>
          <SearchForm query={filterState.query} onChangeQuery={handleChangeQuery} />
        </div>
        <div css={checkboxesWrapperStyle}>
          <FormControlLabel control={<Checkbox onChange={handleTogglePrivateRoom} />} label="個室" />
          <FormControlLabel control={<Checkbox onChange={handleToggleLunch} />} label="ランチ営業あり" />
          <FormControlLabel control={<Checkbox onChange={handleToggleWebReserve} />} label="Web予約可能" />
          <FormControlLabel control={<Checkbox onChange={handleToggleBuffet} />} label="食べ放題" />
          <FormControlLabel control={<Checkbox onChange={handleToggleBottomLessCup} />} label="飲み放題" />
        </div>
        <div css={rangeSelectStyle}>
          <Select onChange={handleChangeRange} value={filterState.range ?? ''}>
            {rangeItems.map(({ label, value }) => (
              <MenuItem key={label} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </Modal>
  );
};
