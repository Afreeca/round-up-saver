import { TransactionDetails } from 'components/types';
import {
  addSavings,
  fetchAccounts,
  fetchTransactions,
  fetchWeeklyRoundUp,
} from '../../src/api/account';

export type ApiRequest = {
  requestId: string;
  title: string;
  errorMessage: Error;
  args?: TransactionDetails | undefined;
  payload: string;
  action: any;
};

export const API_REQUEST_HELPER: ApiRequest[] = [
  {
    requestId: '1',
    title: 'fetching account',
    errorMessage: new Error('Rejected'),
    args: undefined,
    payload: 'Failed to fetch accounts: Request failed with status code 500',
    action: fetchAccounts,
  },
  {
    requestId: '2',
    title: 'fetching transactions',
    errorMessage: new Error('Rejected'),
    args: {
      accountUid: 'string',
      categoryUid: 'string',
      changesSince: 'string',
    },
    payload:
      'Failed to fetch transactions: Request failed with status code 500',
    action: fetchTransactions,
  },
  {
    requestId: '3',
    title: 'fetching Weekly roundUp',
    errorMessage: new Error('Rejected'),
    args: {
      accountUid: '',
      categoryUid: '',
      changesSince: '',
    },
    payload: 'Failed to process round-up: Request failed with status code 500',
    action: fetchWeeklyRoundUp,
  },
  {
    requestId: '4',
    title: 'transfer to savings',
    errorMessage: new Error('Rejected'),
    args: {
      accountUid: '',
      categoryUid: '',
      changesSince: '',
    },
    payload:
      'Failed to transfer to savings: Request failed with status code 500',
    action: addSavings,
  },
];
