import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const Loader = () => {
  const isLoading = useAppSelector(
    (state: RootState) => state.accounts.loading
  );

  return isLoading ? (
    <div className='fixed top-20 left-0 w-full h-full flex justify-center items-center z-50'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
    </div>
  ) : null;
};

export default Loader;
