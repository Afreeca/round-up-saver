import {
  addSavings,
  fetchAccounts,
  fetchTransactions,
  fetchWeeklyRoundUp,
} from '../../src/api/account';

export const API_REQUEST_HELPER = [
  {
    requestId: '1',
    title: 'fetching account',
    errorMessage: new Error('Rejected'),
    payload: 'Failed to fetch accounts: Request failed with status code 500',
    action: fetchAccounts,
  },
  {
    requestId: '2',
    title: 'fetching transactions',
    errorMessage: new Error('Rejected'),
    payload:
      'Failed to fetch transactions: Request failed with status code 500',
    action: fetchTransactions,
  },
  {
    requestId: '3',
    title: 'fetching Weekly roundUp',
    errorMessage: new Error('Rejected'),
    payload: 'Failed to process round-up: Request failed with status code 500',
    action: fetchWeeklyRoundUp,
  },
  {
    requestId: '4',
    title: 'transfer to savings',
    errorMessage: new Error('Rejected'),
    payload:
      'Failed to transfer to savings: Request failed with status code 500',
    action: addSavings,
  },
];
