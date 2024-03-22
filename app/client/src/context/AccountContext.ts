import { Account, TransactionDetails, TransactionItem } from './../components/types';
import constate from 'constate'

import { useState, useEffect } from 'react';
import { getAccounts } from '../api/account';


export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>();
  const [selectedAccount, setSelectedAccount] = useState<TransactionDetails>()
  const [transactions, setTransactions] = useState<TransactionItem[]>()

  useEffect(() => {
    const fetchAccountsData = async () => {
      const result = await getAccounts();
      setAccounts(result.accounts);
    };

    fetchAccountsData();
  }, []);

  return {
    accounts,
    selectedAccount,
    setSelectedAccount,
    transactions,
    setTransactions,
  }
};

export const [AccountsContextProvider, useAccountsContext] = constate(useAccounts)
