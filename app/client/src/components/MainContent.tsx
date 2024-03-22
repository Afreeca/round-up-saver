
import React from 'react';
import AccountCard from './AccountCard';
import { getTransactions } from '../api/account';
import { TransactionDetails } from './types';
import ViewTransactions from './ViewTransactions';
import { useAccountsContext } from 'context/AccountContext';

const MainContent = ()  => {
  const { accounts, transactions, setSelectedAccount, setTransactions } = useAccountsContext(); 

  const handleFetchTransactions = async(data: TransactionDetails) => {
    setSelectedAccount(data)
    const result = await getTransactions(data)
    setTransactions(result.feedItems)
}

  return (
    <div className="bg-stone-50 flex flex-col justify-center gap-2 p-10">
      <div className='flex gap-2 h-min'>
        {accounts?.length > 0 && accounts.map(account => (
          <AccountCard 
            key={account.accountUid} 
            data={account} 
            onFetchTransactions={handleFetchTransactions}
          />
        ))}
      </div>
     { transactions?.length > 0 && <ViewTransactions/>}
    </div>
  );
}

export default MainContent;
