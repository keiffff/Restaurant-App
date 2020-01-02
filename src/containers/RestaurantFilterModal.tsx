/** @jsx jsx */
import { ChangeEvent, useCallback, useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { Button, Checkbox, FormControlLabel, MenuItem, Modal, Select } from '@material-ui/core';
import { Cancel as CancelIcon, Navigation as NavigationIcon } from '@material-ui/icons';
import { SearchForm } from 'components/SearchForm';
import { FilterState, FilterRestaurantContext } from 'contexts/filterRestaurant';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: FilterState) => void;
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
  marginBottom: 24,
});

const buttonsWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  '> button': {
    width: '80%',
  },
});

export const RestarantFilterModal = ({ open, onClose, onSubmit }: Props) => {
  const { filterState, filterDispatch, resetFilter } = useContext(FilterRestaurantContext);
  const handleCloseModal = useCallback(() => {
    resetFilter();
    onClose();
  }, [resetFilter, onClose]);
  const handleTogglePrivateRoom = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => filterDispatch({ type: 'togglePrivateRoom', payload: e.target.checked }),
    [filterDispatch],
  );
  const handleToggleLunch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => filterDispatch({ type: 'toggleLunch', payload: e.target.checked }),
    [filterDispatch],
  );
  const handleToggleWebReserve = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => filterDispatch({ type: 'toggleWebReserve', payload: e.target.checked }),
    [filterDispatch],
  );
  const handleToggleBuffet = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => filterDispatch({ type: 'toggleBuffet', payload: e.target.checked }),
    [filterDispatch],
  );
  const handleToggleBottomLessCup = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => filterDispatch({ type: 'toggleBottomLessCup', payload: e.target.checked }),
    [filterDispatch],
  );
  const handleChangeQuery = useCallback((value: string) => filterDispatch({ type: 'changeQuery', payload: value }), [
    filterDispatch,
  ]);
  const handleChangeRange = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => filterDispatch({ type: 'changeRange', payload: Number(e.target.value) }),
    [filterDispatch],
  );
  const handleSubmit = useCallback(() => {
    onSubmit(filterState);
    resetFilter();
  }, [filterState, onSubmit, resetFilter]);

  return (
    <Modal css={modalStyle} open={open} onClose={handleCloseModal}>
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
        <div css={buttonsWrapperStyle}>
          <Button size="small" onClick={handleSubmit}>
            <NavigationIcon />
            送信
          </Button>
          <Button size="small" onClick={handleCloseModal}>
            <CancelIcon /> キャンセル
          </Button>
        </div>
      </div>
    </Modal>
  );
};
