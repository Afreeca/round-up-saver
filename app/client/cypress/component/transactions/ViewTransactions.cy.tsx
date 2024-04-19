import React from 'react';
import ViewTransactions from '../../../src/components/transactions/ViewTransactions';
import { Account } from '../../../src/components/types';
import {
  resetState,
  setSelectedAccount,
} from '../../../src/redux/slices/accountsSlice';
import { getStore } from '../../../src/redux/store';
import { testAccountHasTransaction } from '../../helpers/test.utils';

describe('ViewTransactions', () => {
  let accounts: Account[];
  let account: Account;
  const store = getStore();

  before(() => {
    cy.fixture('accounts.json').then((data) => {
      accounts = data;
      account = accounts[0];
    });
  });

  beforeEach(() => {
    cy.mount(<ViewTransactions />, { reduxStore: store });
  });

  describe('Account not selected', () => {
    it('Should not display', () => {
      cy.getByTestId('transactions').should('not.exist');
      cy.get('p').should('not.exist');
    });
  });

  describe('Account is selected', () => {
    it('Should display message for no account transactions', () => {
      store.dispatch(resetState());
      store.dispatch(setSelectedAccount(account));
      cy.getByTestId('transactions').should('not.exist');
      cy.get('p').should('contain.text', 'No transactions available.');
    });

    it.only('Should display transaction table when account has transactions', () => {
      cy.fixture('transactions.json').then((transactions) => {
        store.dispatch(setSelectedAccount(account));
        testAccountHasTransaction(transactions, account, store);
      });
    });
  });
});
