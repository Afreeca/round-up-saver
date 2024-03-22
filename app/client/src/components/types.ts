export type Account = {
    accountType: string,
    accountUid: string, 
    createdAt: string,
    currency: string,
    defaultCategory: string, 
    name: string
}


export type AccountInfo = {
  accounts: Account[]
}

export type AccountProps = {
    data: Account
    onFetchTransactions: (data: TransactionDetails) => void
}

export type TransactionDetails = {
    accountUid: string, 
    categoryUid: string, 
    changesSince: string
  }

type CurrencyAmount = {
    currency: string;
    minorUnits: number;
  };

export enum Direction {
OUT = 'OUT',
IN = 'IN',
}
  
export type TransactionItem = {
  feedItemUid: string;
  categoryUid: string;
  amount: CurrencyAmount;
  sourceAmount: CurrencyAmount;
  direction: keyof Direction;
  updatedAt: string;
  transactionTime: string;
  settlementTime: string;
  source: string;
  status: string;
  transactingApplicationUserUid?: string;
  counterPartyType: string;
  counterPartyUid?: string;
  counterPartyName: string;
  counterPartySubEntityUid?: string;
  counterPartySubEntityName: string;
  counterPartySubEntityIdentifier: string;
  counterPartySubEntitySubIdentifier: string;
  reference: string;
  country: string;
  spendingCategory: string;
  hasAttachment: boolean;
  hasReceipt: boolean;
  batchPaymentDetails: null | any;
};

export type TransactionInfo = {
  feedItems: TransactionItem[];
};

