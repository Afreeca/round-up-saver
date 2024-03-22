import { CurrencyAmount } from './balance';

export type TransactionItem = {
  feedItemUid: string;
  categoryUid: string;
  amount: CurrencyAmount;
  sourceAmount: CurrencyAmount;
  direction: string;
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

export enum Direction {
  OUT = 'OUT',
  IN = 'IN',
}
