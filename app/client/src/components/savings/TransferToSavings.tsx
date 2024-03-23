import React, { useState } from 'react';
import { RoundUpInfo, SavingAccount } from '../types';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addSavings } from 'api/account';
import SavingAccountItem from './SavingAccountItem';

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
            savingAccounts.map((account) => (
              <SavingAccountItem
                key={account.savingsGoalUid}
                account={account}
                isSelected={
                  selectedSaving?.savingsGoalUid === account.savingsGoalUid
                }
                onAccountSelection={handleAccountSelection}
              />
            ))
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
