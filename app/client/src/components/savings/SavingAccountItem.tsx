import React from 'react';
import { SavingAccount } from '../types';
import { Button } from '@mui/material';

interface Props {
  account: SavingAccount;
  isSelected: boolean;
  onAccountSelection: (account: SavingAccount) => void;
}

const SavingAccountItem: React.FC<Props> = ({
  account,
  isSelected,
  onAccountSelection,
}) => {
  const btnTitle = isSelected ? 'selected' : 'select';

  return (
    <div>
      <h6 className='mt-2 mb-1'>Saving accounts</h6>
      <div className='border-2 px-1'>
        <div className='flex justify-between items-center'>
          <div>
            <span className='text-base font-bold'>Name:</span>{' '}
            <span className='text-base'>{account.name}</span>
            <p className='text-base font-bold'>
              Total Saved:&nbsp;
              <span className='font-bold text-lg text-green-700'>
                {account.totalSaved.minorUnits / 100}
              </span>
            </p>
          </div>
          <Button
            variant='contained'
            color={isSelected ? 'info' : 'inherit'}
            size='small'
            onClick={() => onAccountSelection(account)}
          >
            {btnTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavingAccountItem;
