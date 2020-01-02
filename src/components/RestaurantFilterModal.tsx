/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Checkbox, FormControlLabel, Modal, Select } from '@material-ui/core';
import { SearchForm } from 'components/SearchForm';

type Props = {
  open: boolean;
  onClose: () => void;
};

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
  '> .MuiInput-root': {
    width: '100%',
  },
  marginBottom: 12,
});

const checkboxesWrapperStyle = css({
  marginBottom: 12,
});

const rangeSelectStyle = css({
  '&:before': {
    content: '"ここから"',
  },
  '&:after': {
    content: '"m 以内"',
  },
  marginBottom: 12,
});

export const RestarantFilterModal = ({ open, onClose }: Props) => {
  return (
    <Modal css={modalStyle} open={open} onClose={onClose}>
      <div css={contentWrapperStyle}>
        <div css={searchFormWrapperStyle}>
          <SearchForm />
        </div>
        <div css={checkboxesWrapperStyle}>
          <FormControlLabel control={<Checkbox />} label="個室" />
          <FormControlLabel control={<Checkbox />} label="ランチ営業あり" />
          <FormControlLabel control={<Checkbox />} label="Web予約可能" />
          <FormControlLabel control={<Checkbox />} label="食べ放題" />
          <FormControlLabel control={<Checkbox />} label="飲み放題" />
        </div>
        <div css={rangeSelectStyle}>
          <Select />
        </div>
      </div>
    </Modal>
  );
};
