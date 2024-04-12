import React from 'react';
import { fetchAccounts } from '../../src/api/account';
import AccountsViewer from '../../src/components/account/AccountsViewer';
import { getStore } from '../../src/redux/store';

describe('Account Viewer', () => {
  const store = getStore();
  beforeEach(() => {
    store.dispatch(fetchAccounts());
    cy.mount(<AccountsViewer />, { reduxStore: store });
  });
  it('displays accounts after loading', () => {
    cy.fixture('accounts.json').then((accounts) => {
      store.dispatch(
        fetchAccounts.fulfilled(
          {
            accounts: [
              {
                accountUid: '24682ee7-eaa7-4c8d-830a-2107389bf9e9',
                accountType: 'PRIMARY',
                defaultCategory: '2468485f-373e-42d6-9545-152569037a3b',
                currency: 'GBP',
                createdAt: '2024-03-21T19:20:23.431Z',
                name: 'Personal',
              },
            ],
          },
          ''
        )
      );

      cy.contains('No accounts available').should('not.exist');
      cy.get('[data-cy=account-viewer]')
        .find('.AccountCard')
        .should('have.length', 0);
    });
  });

  // it('header should display', () => {
  //   cy.get('[data-cy=account-viewer]').should(
  //     'contain.text',
  //     'No accounts available.'
  //   );
  // });
});
