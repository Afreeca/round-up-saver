import React, { useEffect } from 'react';
import AccountCard from './AccountCard';
import { fetchAccounts } from '../api/account';
import ViewTransactions from './transactions/ViewTransactions';
import { RootState } from 'redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Loader from './Loader';
import { Alert } from '@mui/material';
import { resetState } from '../redux/slides/accountsSlice';

const MainContent = () => {
  const dispatch = useAppDispatch();
  const { accounts, successMessage, loading, error } = useAppSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(resetState());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  return (
    <div className='bg-stone-50 flex flex-col justify-center gap-2 p-10'>
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {error && <Alert severity='error'>{error}</Alert>}
      {loading && <Loader />}
      <div className='flex gap-2 h-min'>
        {accounts?.length > 0
          ? accounts.map((account) => (
              <AccountCard key={account.accountUid} data={account} />
            ))
          : !loading && <p>No accounts available.</p>}
      </div>
      <ViewTransactions />
    </div>
  );
};

export default MainContent;
