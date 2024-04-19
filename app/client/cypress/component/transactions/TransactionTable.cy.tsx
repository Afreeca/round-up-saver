import { Account } from 'components/types';
import React from 'react';
import { fetchTransactions } from '../../../src/api/account';
import TransactionTable from '../../../src/components/transactions/TransactionTable';
import { getStore } from '../../../src/redux/store';
import { getStartOfWeek } from '../../../src/utils/date';
import { testAccountHasTransaction } from '../../helpers/test.utils';

describe('TransactionTable', () => {
  const store = getStore();
  let account: Account;

  before(() => {
    cy.fixture('accounts.json').then((acc) => {
      account = acc[0];

      store.dispatch(
        fetchTransactions({
          accountUid: account.accountUid,
          categoryUid: account.defaultCategory,
          changesSince: getStartOfWeek(),
        })
      );
    });
  });

  beforeEach(() => {
    cy.mount(<TransactionTable />, { reduxStore: store });
  });

  describe('Account has no transactions', () => {
    it('Should not display', () => {
      cy.getByTestId('transaction-table').should('not.exist');
    });
  });

  describe('Account has transactions', () => {
    it('Should display the transaction table', () => {
      cy.fixture('transactions.json').then((transactions) => {
        testAccountHasTransaction(transactions, account, store);
      });
    });
  });
});
