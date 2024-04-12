import { fetchAccounts } from 'api/account';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import AccountCard from './AccountCard';

const AccountsViewer = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: RootState) => state.accounts.loading
  );
  const accounts = useAppSelector(
    (state: RootState) => state.accounts.accounts
  );

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <div
      className='flex gap-2 h-min'
      data-cy='account-viewer'
    >
      {accounts?.length > 0
        ? accounts.map((account) => (
            <AccountCard
              key={account.accountUid}
              data={account}
            />
          ))
        : !isLoading && <p>No accounts available.</p>}
    </div>
  );
};

export default AccountsViewer;
