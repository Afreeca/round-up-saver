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
