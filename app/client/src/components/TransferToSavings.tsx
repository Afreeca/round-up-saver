import React, { useState } from 'react';
import { RoundUpInfo, SavingAccount } from './types';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSavings } from 'api/account';

export type Props = RoundUpInfo & {
  onCancel: () => void;
};

const TransferToSavings = ({
  savingAccounts,
  totalRoundUpAmount,
  onCancel,
}: Props) => {
  const dispatch = useAppDispatch();
  const selectedAccount = useAppSelector(
    (state) => state.accounts.selectedAccount
  );
  const [selectedSaving, setSelectedSaving] = useState<SavingAccount>();

  const renderSavingAccounts = (savingAccounts: SavingAccount[]) => {
    return (
      <>
        {savingAccounts?.map((account) => {
          const isSelected =
            selectedSaving?.savingsGoalUid === account.savingsGoalUid;
          const btnTitle = isSelected ? 'selected' : 'select';

          return (
            <div key={account.savingsGoalUid}>
              {' '}
              {/* Add key prop */}
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
                    onClick={() => handleAccountSelection(account)}
                  >
                    {btnTitle}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const handleTransferToSavings = () => {
    dispatch(
      addSavings({
        accountUid: selectedAccount.accountUid,
        savingsGoalUid: selectedSaving.savingsGoalUid,
        amount: {
          currency: selectedSaving.totalSaved.currency,
          minorUnits: totalRoundUpAmount * 100,
        },
      })
    ).then(() => onCancel());
  };

  const handleAccountSelection = (account: SavingAccount) => {
    setSelectedSaving((prev: SavingAccount) =>
      prev?.savingsGoalUid === account.savingsGoalUid ? null : account
    );
  };

  return (
    <>
      <DialogContent>
        <div>
          {savingAccounts?.length > 0 ? (
            renderSavingAccounts(savingAccounts)
          ) : (
            <p>There are no saving accounts created</p>
          )}
        </div>
        <span className='text-base'>
          Total Amount to be transferred:&nbsp;
          <span className='font-bold text-lg text-amber-600'>
            {totalRoundUpAmount}
          </span>
        </span>

        <p>Choose the saving account to transfer to</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          disabled={!selectedSaving}
          onClick={handleTransferToSavings}
          variant='contained'
          color='success'
        >
          Transfer
        </Button>
      </DialogActions>
    </>
  );
};

export default TransferToSavings;
