import React from 'react';
import ViewTransactions from './transactions/ViewTransactions';
import AccountsViewer from './account/AccountsViewer';

const MainContent = () => {
  return (
    <div className='bg-stone-50 flex flex-col justify-center gap-2 p-10'>
      <AccountsViewer />
      <ViewTransactions />
    </div>
  );
};

export default MainContent;
