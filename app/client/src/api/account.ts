import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  AccountInfo,
  AddSavingInfo,
  RoundUpInfo,
  TransactionDetails,
  TransactionInfo,
  TransferSaving,
} from 'components/types';

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const fetchAccounts = createAsyncThunk<
  AccountInfo,
  void,
  { rejectValue: string }
>('accounts/fetchAccounts', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}/api/accounts`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      `Failed to fetch accounts: ${(error as AxiosError).message}`
    );
  }
});

export const fetchTransactions = createAsyncThunk<
  TransactionInfo,
  TransactionDetails,
  {
    rejectValue: string;
  }
>('transactions/fetchTransactions', async (transactionDetails, thunkAPI) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/accounts/transactions`,
      transactionDetails
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      `Failed to fetch transactions: ${(error as AxiosError).message}`
    );
  }
});

export const fetchWeeklyRoundUp = createAsyncThunk<
  RoundUpInfo,
  TransactionDetails,
  {
    rejectValue: string;
  }
>('transactions/fetchWeeklyRoundUp', async (transactionDetails, thunkAPI) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/round-up`,
      transactionDetails
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      `Failed to process round-up: ${(error as AxiosError).message}`
    );
  }
});

export const addSavings = createAsyncThunk<
  AddSavingInfo,
  TransferSaving,
  {
    rejectValue: string;
  }
>('transactions/add-savings', async (transferdata, thunkAPI) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/accounts/add-saving`,
      transferdata
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      `Failed to transfer to savings: ${(error as AxiosError).message}`
    );
  }
});
