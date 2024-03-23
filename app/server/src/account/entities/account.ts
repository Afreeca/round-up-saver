import { CurrencyAmount } from './balance';

export type Account = {
  accountUid: string;
  accountType: string;
  defaultCategory: string;
  currency: string;
  createdAt: string;
  name: string;
};

export type AccountInfo = {
  accounts: Account[];
};

export type SavingAccount = {
  savingsGoalUid: string;
  name: string;
  totalSaved: CurrencyAmount;
  sortOrder: number;
  state: string;
};

export type SavingAccountInfo = {
  savingsGoalList: SavingAccount[];
};
