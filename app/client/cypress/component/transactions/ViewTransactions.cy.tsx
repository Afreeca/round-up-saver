import React from 'react';
import { fetchTransactions } from '../../../src/api/account';
import ViewTransactions from '../../../src/components/transactions/ViewTransactions';
import { Account } from '../../../src/components/types';
import { setSelectedAccount } from '../../../src/redux/slides/accountsSlice';
import { getStore } from '../../../src/redux/store';

describe('ViewTransactions', () => {
  const store = getStore();
  beforeEach(() => {
    cy.mount(<ViewTransactions />);
  });

  it('Should display a message when fetching transactions fails', () => {
    cy.fixture('accounts.json').then((accounts) => {
      const account: Account = accounts[0];
      store.dispatch(setSelectedAccount(account));

      store.dispatch(
        fetchTransactions.rejected(
          new Error('Rejected'),
          '1',
          {
            accountUid: '1',
            categoryUid: 'cagetory',
            changesSince: '2024-03-25T10:00:00Z',
          },
          'Failed to fetch accounts: Request failed with status code 500'
        )
      );

      cy.get('p').should('contain.text', 'No transactions available.');
    });
  });

  it('Should display a message when there are no transactions', () => {
    store.dispatch(
      fetchTransactions.fulfilled({ feedItems: [] }, '', {
        accountUid: '1',
        categoryUid: 'cagetory',
        changesSince: '2024-03-25T10:00:00Z',
      })
    );
    cy.get('p').should('contain.text', 'No transactions available.');
  });

  it('Should not display when acount is not selected', () => {
    cy.fixture('accounts.json').then((accounts) => {
      const account: Account = accounts[0];
      store.dispatch(setSelectedAccount(account));
      cy.get('p').should('contain.text', '');
    });
  });

  it('Should not display when loading', () => {
    store.dispatch(
      fetchTransactions.pending('transactions/fetchTransactions/pending', {
        accountUid: '1',
        categoryUid: 'cagetory',
        changesSince: '2024-03-25T10:00:00Z',
      })
    );

    cy.get('p').should('contain.text', '');
  });
});
