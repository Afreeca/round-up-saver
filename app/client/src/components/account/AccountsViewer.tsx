import React, { useEffect } from 'react';
import AccountCard from './AccountCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { fetchAccounts } from 'api/account';

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
    <div className='flex gap-2 h-min'>
      {accounts.length > 0
        ? accounts.map((account) => (
            <AccountCard key={account.accountUid} data={account} />
          ))
        : !isLoading && <p>No accounts available.</p>}
    </div>
  );
};

export default AccountsViewer;
