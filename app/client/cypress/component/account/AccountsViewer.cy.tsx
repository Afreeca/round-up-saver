import React from 'react';
import { fetchAccounts } from '../../../src/api/account';
import AccountsViewer from '../../../src/components/account/AccountsViewer';
import { Account } from '../../../src/components/types';
import { getStore } from '../../../src/redux/store';
import { fDate } from '../../../src/utils/date';

describe('Account Viewer', () => {
  const store = getStore();
  beforeEach(() => {
    store.dispatch(fetchAccounts());
    cy.mount(<AccountsViewer />, { reduxStore: store });
  });

  it('should display message for no account available', () => {
    store.dispatch(fetchAccounts.fulfilled({ accounts: [] }, ''));
    cy.getByTestId('account-viewer').should(
      'contain.text',
      'No accounts available.'
    );
  });

  it('displays accounts information', () => {
    cy.fixture('accounts.json').then((accounts) => {
      store.dispatch(fetchAccounts.fulfilled({ accounts }, ''));

      cy.contains('No accounts available').should('not.exist');
      cy.getByTestId('account-viewer')
        .find('[data-cy=account-card]')
        .should('have.length', 1);
    });
  });

  it('display card information correctly', () => {
    cy.fixture('accounts.json').then((accounts) => {
      const account: Account = accounts[0];
      fetchAccounts.fulfilled(
        {
          accounts: [account],
        },
        ''
      );

      cy.getByTestId('account-viewer').should('be.visible');

      cy.getByTestId('account-card').should('be.visible').as('accountCard');

      cy.get('@accountCard')
        .contains('Account Information')
        .should('be.visible');

      cy.get('@accountCard')
        .contains('Account Information')
        .should('have.length', 1);

      cy.get('@accountCard')
        .contains(`Name: ${account.name}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Currency: ${account.currency}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Type: ${account.accountType}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Created: ${fDate(account.createdAt)}`)
        .should('be.visible');
    });

    cy.getByTestId('account-viewer')
      .find('button')
      .contains('View transactions')
      .should('be.visible');
  });
});
