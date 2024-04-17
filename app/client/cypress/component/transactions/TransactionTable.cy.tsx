import React from 'react';
import { fetchTransactions } from '../../../src/api/account';
import TransactionTable from '../../../src/components/transactions/TransactionTable';
import { getStore } from '../../../src/redux/store';
import { getStartOfWeek } from '../../../src/utils/date';

describe('Loader', () => {
  const store = getStore();

  before(() => {
    cy.fixture('accounts.json').then((accounts) => {
      const account = accounts[0];
      store.dispatch(
        fetchTransactions({
          accountUid: account.accountUid,
          categoryUid: account.defaultCategory,
          changesSince: getStartOfWeek(),
        })
      );
      cy.mount(<TransactionTable />, { reduxStore: store });
    });
  });

  it('Should not display if there are no transaction', () => {
    store.dispatch(
      fetchTransactions.fulfilled({ feedItems: [] }, '', {
        accountUid: '',
        categoryUid: '',
        changesSince: '',
      })
    );
    cy.getByTestId('transaction-table').should('not.exist');
  });

  it('Should not display when acount is not selected', () => {
    cy.fixture('transactions.json').then((transactions) => {
      store.dispatch(
        fetchTransactions.fulfilled({ feedItems: transactions }, '', {
          accountUid: '',
          categoryUid: '',
          changesSince: '',
        })
      );
    });
  });
});
