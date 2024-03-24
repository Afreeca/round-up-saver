import { SavingAccount } from '@account/entities/account';

export type RoundUpDto = {
  savingAccounts: SavingAccount[];
  totalRoundUpAmount: number;
};
