import { BalanceInfo } from '@account/entities/balance';

export const BALANCE: BalanceInfo = {
  clearedBalance: {
    currency: 'GBP',
    minorUnits: 5391
  },
  effectiveBalance: {
    currency: 'GBP',
    minorUnits: 5391
  },
  pendingTransactions: {
    currency: 'GBP',
    minorUnits: 0
  },
  acceptedOverdraft: {
    currency: 'GBP',
    minorUnits: 0
  },
  amount: {
    currency: 'GBP',
    minorUnits: 5391
  },
  totalClearedBalance: {
    currency: 'GBP',
    minorUnits: 5391
  },
  totalEffectiveBalance: {
    currency: 'GBP',
    minorUnits: 5391
  }
};

export const BALANCE_INFO = { '1': BALANCE };
