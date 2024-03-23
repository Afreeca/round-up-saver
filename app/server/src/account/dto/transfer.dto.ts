import { CurrencyAmount } from '../entities/balance';

export type TransferSaving = {
  accountUid: string;
  savingsGoalUid: string;
  amount: CurrencyAmount;
};
