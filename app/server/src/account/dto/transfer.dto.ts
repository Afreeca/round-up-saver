import { CurrencyAmount } from '@account/entities/balance';

export type TransferSaving = {
  accountUid: string;
  savingsGoalUid: string;
  amount: CurrencyAmount;
};
