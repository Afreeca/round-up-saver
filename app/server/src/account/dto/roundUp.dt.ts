import { SavingAccount } from '../entities/account';

export type RoundUpDto = {
  savingAccounts: SavingAccount[];
  totalRoundUpAmount: number;
};
