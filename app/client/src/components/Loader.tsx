import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const Loader = () => {
  const isLoading = useAppSelector(
    (state: RootState) => state.accounts.loading
  );

  return isLoading ? (
    <div
      className='fixed top-20 left-0 w-full h-full flex justify-center items-center z-50'
      data-cy='spinner'
    >
      <div
        style={{
          border: '4px solid rgba(0, 0, 0, 0.1)',
          borderTop: '4px solid #000',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
    </div>
  ) : null;
};

export default Loader;
