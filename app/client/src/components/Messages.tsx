import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Alert } from '@mui/material';
import { resetState } from '../redux/slides/accountsSlice';

const Messages = () => {
  const dispatch = useAppDispatch();
  const successMessage = useAppSelector(
    (state: RootState) => state.accounts.successMessage
  );

  const errorMessage = useAppSelector(
    (state: RootState) => state.accounts.error
  );

  const message = successMessage ?? errorMessage;
  const type = successMessage ? 'success' : 'error';

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(resetState());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  return message ? (
    <div className=''>
      <Alert severity={type}>{message}</Alert>
    </div>
  ) : null;
};

export default Messages;
