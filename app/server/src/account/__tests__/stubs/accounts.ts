import { SavingAccount, AccountInfo } from '@account/entities/account';

export const ACCOUNTS = [
  {
    accountUid: '1',
    accountType: 'Personal',
    defaultCategory: 'category',
    currency: 'GBP',
    createdAt: 'GBP',
    name: 'Account name'
  }
];

export const ACCOUNT_INFO: AccountInfo = {
  accounts: ACCOUNTS
};

export const SAVING_ACCOUNTS: SavingAccount[] = [
  {
    savingsGoalUid: '1',
    name: 'name 1',
    totalSaved: { minorUnits: 500, currency: 'GBP' },
    sortOrder: 1,
    state: 'active'
  },
  {
    savingsGoalUid: '2',
    name: 'name 2',
    totalSaved: { minorUnits: 1000, currency: 'GBP' },
    sortOrder: 2,
    state: 'active'
  },
  {
    savingsGoalUid: '3',
    name: 'name 3',
    totalSaved: { minorUnits: 2500, currency: 'GBP' },
    sortOrder: 3,
    state: 'active'
  }
];

export const SAVING_ACCOUNTS_INFO = {
  '1': { savingsGoalList: SAVING_ACCOUNTS }
};
