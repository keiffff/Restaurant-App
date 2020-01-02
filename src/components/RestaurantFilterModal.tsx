/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export const RestarantFilterModal = () => {
  return (
    <div>
      <FormControlLabel control={<Checkbox />} label="個室" />
      <FormControlLabel control={<Checkbox />} label="ランチ営業アリ" />
      <FormControlLabel control={<Checkbox />} label="Web予約可能" />
      <FormControlLabel control={<Checkbox />} label="食べ放題" />
      <FormControlLabel control={<Checkbox />} label="飲み放題" />
    </div>
  );
};
