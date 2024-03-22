export type CurrencyAmount = {
  currency: string;
  minorUnits: number;
};

type BalanceType =
  | 'clearedBalance'
  | 'effectiveBalance'
  | 'pendingTransactions'
  | 'acceptedOverdraft'
  | 'amount'
  | 'totalClearedBalance'
  | 'totalEffectiveBalance';

export type BalanceInfo = {
  [key in BalanceType]: CurrencyAmount;
};
