import { Direction } from '@account/entities/transaction';

export const TRANSACTIONS = [
  {
    feedItemUid: '1',
    categoryUid: 'category_1',
    amount: { minorUnits: 100, currency: 'GBP' },
    sourceAmount: { minorUnits: 100, currency: 'GBP' },
    direction: Direction.OUT,
    updatedAt: '2024-03-24T12:00:00Z',
    transactionTime: '2024-03-24T12:00:00Z',
    settlementTime: '2024-03-24T12:00:00Z',
    source: 'source_1',
    status: 'completed',
    counterPartyType: 'individual',
    counterPartyName: 'John Doe',
    counterPartySubEntityName: '',
    counterPartySubEntityIdentifier: '',
    counterPartySubEntitySubIdentifier: '',
    reference: 'reference_1',
    country: 'US',
    spendingCategory: 'groceries',
    hasAttachment: false,
    hasReceipt: false,
    batchPaymentDetails: null
  },
  {
    feedItemUid: '2',
    categoryUid: 'category_2',
    amount: { minorUnits: 50, currency: 'EUR' },
    sourceAmount: { minorUnits: 50, currency: 'EUR' },
    direction: Direction.IN,
    updatedAt: '2024-03-25T10:00:00Z',
    transactionTime: '2024-03-25T10:00:00Z',
    settlementTime: '2024-03-25T10:00:00Z',
    source: 'source_2',
    status: 'completed',
    counterPartyType: 'business',
    counterPartyName: 'ABC Company',
    counterPartySubEntityName: '',
    counterPartySubEntityIdentifier: '',
    counterPartySubEntitySubIdentifier: '',
    reference: 'reference_2',
    country: 'UK',
    spendingCategory: 'utilities',
    hasAttachment: true,
    hasReceipt: true,
    batchPaymentDetails: null
  },
  {
    feedItemUid: '3',
    categoryUid: 'category_3',
    amount: { minorUnits: 200, currency: 'GBP' },
    sourceAmount: { minorUnits: 200, currency: 'GBP' },
    direction: Direction.OUT,
    updatedAt: '2024-03-26T15:00:00Z',
    transactionTime: '2024-03-26T15:00:00Z',
    settlementTime: '2024-03-26T15:00:00Z',
    source: 'source_3',
    status: 'pending',
    counterPartyType: 'business',
    counterPartyName: 'XYZ Corporation',
    counterPartySubEntityName: '',
    counterPartySubEntityIdentifier: '',
    counterPartySubEntitySubIdentifier: '',
    reference: 'reference_3',
    country: 'US',
    spendingCategory: 'entertainment',
    hasAttachment: false,
    hasReceipt: false,
    batchPaymentDetails: null
  }
];

export const TRANSACTIONS_INFO = {
  '1': { feedItems: TRANSACTIONS }
};
