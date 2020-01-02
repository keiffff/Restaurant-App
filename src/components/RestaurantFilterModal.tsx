/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Checkbox, FormControlLabel, Modal, Select } from '@material-ui/core';

type Props = {
  open: boolean;
  onClose: () => void;
};

const rangeSelectStyle = css({
  '&:before': {
    content: '"ここから"',
  },
  '&:after': {
    content: '"m 以内"',
  },
});

export const RestarantFilterModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <FormControlLabel control={<Checkbox />} label="個室" />
        <FormControlLabel control={<Checkbox />} label="ランチ営業アリ" />
        <FormControlLabel control={<Checkbox />} label="Web予約可能" />
        <FormControlLabel control={<Checkbox />} label="食べ放題" />
        <FormControlLabel control={<Checkbox />} label="飲み放題" />
        <div css={rangeSelectStyle}>
          <Select />
        </div>
      </div>
    </Modal>
  );
};
