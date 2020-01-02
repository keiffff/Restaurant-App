/** @jsx jsx */
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { jsx, css } from '@emotion/core';
import { Button, Checkbox, FormControlLabel, MenuItem, Modal, Select } from '@material-ui/core';
import { Cancel as CancelIcon, Navigation as NavigationIcon } from '@material-ui/icons';
import { useLocationInfo } from 'hooks/LocationInfo';
import { SearchForm } from 'components/SearchForm';
import { FilterState, FilterRestaurantContext } from 'contexts/filterRestaurant';

type Location = { latitude: number; longitude: number };

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: FilterState, location?: Location) => void;
};

const rangeItems = [
  { label: '', value: 0 },
  { label: '300', value: 1 },
  { label: '500', value: 2 },
  { label: '1000', value: 3 },
  { label: '2000', value: 4 },
  { label: '3000', value: 5 },
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
  const { positionError, currentPosition } = useLocationInfo({});
  const [location, setLocation] = useState<Location>();
  const { filterState, filterDispatch } = useContext(FilterRestaurantContext);
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
    (e: ChangeEvent<{ value: unknown }>) => {
      if (!currentPosition) return;
      setLocation({ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude });
      filterDispatch({ type: 'changeRange', payload: Number(e.target.value) ? Number(e.target.value) : null });
    },
    [currentPosition, filterDispatch],
  );
  const handleSubmit = useCallback(() => {
    onSubmit(filterState, location);
    setLocation(undefined);
    onClose();
  }, [filterState, location, onClose, onSubmit]);

  return (
    <Modal css={modalStyle} open={open} onClose={onClose}>
      <div css={contentWrapperStyle}>
        <div css={searchFormWrapperStyle}>
          <SearchForm query={filterState.query} onChangeQuery={handleChangeQuery} onSubmit={handleSubmit} />
        </div>
        <div css={checkboxesWrapperStyle}>
          <FormControlLabel
            control={<Checkbox checked={filterState.privateRoom} onChange={handleTogglePrivateRoom} />}
            label="個室"
          />
          <FormControlLabel
            control={<Checkbox checked={filterState.lunch} onChange={handleToggleLunch} />}
            label="ランチ営業あり"
          />
          <FormControlLabel
            control={<Checkbox checked={filterState.webReserve} onChange={handleToggleWebReserve} />}
            label="Web予約可能"
          />
          <FormControlLabel
            control={<Checkbox checked={filterState.buffet} onChange={handleToggleBuffet} />}
            label="食べ放題"
          />
          <FormControlLabel
            control={<Checkbox checked={filterState.bottomLessCup} onChange={handleToggleBottomLessCup} />}
            label="飲み放題"
          />
        </div>
        <div css={rangeSelectStyle}>
          <Select
            onChange={handleChangeRange}
            value={filterState.range ?? 0}
            disabled={!!positionError || !currentPosition?.coords}
          >
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
          <Button size="small" onClick={onClose}>
            <CancelIcon /> キャンセル
          </Button>
        </div>
      </div>
    </Modal>
  );
};
