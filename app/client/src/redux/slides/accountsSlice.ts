import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addSavings,
  fetchAccounts,
  fetchTransactions,
  fetchWeeklyRoundUp,
} from 'api/account';
import { Account, AccountsState } from 'components/types';
import { RootState } from '../../redux/store';

const initialState: AccountsState = {
  accounts: [],
  selectedAccount: null,
  transactions: [],
  successMessage: undefined,
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setSelectedAccount(state, action: PayloadAction<Account | null>) {
      state.selectedAccount = action.payload;
    },
    setSuccessfulMessage(state, action) {
      state.successMessage = action.payload;
    },
    resetState(state) {
      state.selectedAccount = initialState.selectedAccount;
      state.transactions = initialState.transactions;
      state.successMessage = initialState.successMessage;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.accounts;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.feedItems;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWeeklyRoundUp.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(fetchWeeklyRoundUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchWeeklyRoundUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSavings.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(addSavings.fulfilled, (state) => {
        state.loading = false;
        state.successMessage =
          'Amount successfully transferred to savings account.';
      })
      .addCase(addSavings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedAccount, setSuccessfulMessage, resetState } =
  accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts;

export default accountsSlice.reducer;
