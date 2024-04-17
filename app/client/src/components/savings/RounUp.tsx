import { Button, DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import { RoundUpInfo } from '../types';

export type Props = Partial<RoundUpInfo> & {
  onCancel: () => void;
  onNextStep: () => void;
};

const RoundUp = ({ totalRoundUpAmount, onCancel, onNextStep }: Props) => {
  return (
    <>
      <DialogContent>
        <span className='text-base font-bold'>
          Total Roundup Amount:
          <span className='font-bold text-lg text-amber-600'>
            {totalRoundUpAmount}
          </span>
        </span>
        <p>Would you like to transfer this amount to your savings goal?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>No</Button>
        <Button
          onClick={onNextStep}
          variant='contained'
          color='primary'
        >
          Yes
        </Button>
      </DialogActions>
    </>
  );
};

export default RoundUp;
