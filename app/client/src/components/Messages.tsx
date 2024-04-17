import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { resetState } from '../redux/slides/accountsSlice';
import { RootState } from '../redux/store';

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
    <div data-cy='messages'>
      <Alert severity={type}>{message}</Alert>
    </div>
  ) : null;
};

export default Messages;
