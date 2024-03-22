import { TransactionInfo, TransactionDetails, AccountInfo } from "components/types";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const getAccounts = async (): Promise<AccountInfo> => {
    try {
      const response = await fetch(`${apiUrl}/api/accounts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching accounts details:', error);
      throw error;
    }
};


export const getTransactions = async ({ accountUid, categoryUid, changesSince }: TransactionDetails): Promise<TransactionInfo> => {
  try {
    const response = await fetch(`${apiUrl}/api/accounts/transactions`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountUid, categoryUid, changesSince })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; 
  }
};


export const roundUpWeeklyTransactions = async ({ accountUid, categoryUid, changesSince }: TransactionDetails): Promise<number> => {
  try {
    const response = await fetch(`${apiUrl}/api/round-up`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountUid, categoryUid, changesSince })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing weekly roundup:', error);
    throw error; 
  }
};