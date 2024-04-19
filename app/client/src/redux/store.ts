import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountsReducer from './slices/accountsSlice';

const reducers = combineReducers({
  accounts: accountsReducer,
});

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getStore = () => configureStore({ reducer: reducers });
