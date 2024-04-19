import { Account } from 'components/types';
import React from 'react';
import { fDate } from 'utils/date';
import AccountsViewer from '../../../src/components/account/AccountsViewer';

describe('Account Viewer', () => {
  let accounts: Account[];

  before(() => {
    cy.fixture('accounts.json').then((data) => {
      accounts = data;
    });
  });

  it('should display message when user does not have accounts', () => {
    cy.mount(<AccountsViewer />);
    cy.intercept('GET', 'api/accounts', {
      statusCode: 200,
      body: { accounts: [] },
    }).as('fetchEmptyAccounts');

    cy.wait('@fetchEmptyAccounts');

    cy.getByTestId('account-viewer').should(
      'contain.text',
      'No accounts available.'
    );
  });

  it('should displays accounts information when user has account', () => {
    cy.mount(<AccountsViewer />);
    cy.intercept('GET', 'api/accounts', {
      body: { statusCode: 200, accounts: accounts },
    }).as('fetchAccounts');

    cy.wait('@fetchAccounts');

    cy.getByTestId('account-viewer').should(
      'not.contain.text',
      'No accounts available.'
    );

    cy.getByTestId('account-card').should('be.visible').as('accountCard');

    cy.getByTestId('account-viewer').should('be.visible');

    cy.getByTestId('account-card').should('be.visible').as('accountCard');

    cy.get('@accountCard').contains('Account Information').should('be.visible');

    cy.get('@accountCard')
      .contains('Account Information')
      .should('have.length', 1);

    cy.getByTestId('account-viewer')
      .find('button')
      .contains('View transactions')
      .should('be.visible');

    accounts.forEach((account, index) => {
      cy.get('@accountCard')
        .contains(`Name: ${accounts[index].name}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Currency: ${accounts[index].currency}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Type: ${accounts[index].accountType}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Created: ${fDate(accounts[index].createdAt)}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Type: ${accounts[index].accountType}`)
        .should('be.visible');

      cy.get('@accountCard')
        .contains(`Created: ${fDate(accounts[index].createdAt)}`)
        .should('be.visible');
    });
  });

  it('should display message when the request fails', () => {
    cy.mount(<AccountsViewer />);
    cy.intercept('GET', 'api/accounts', {
      statusCode: 500,
      body: { message: 'error' },
    }).as('fetchAccountsError');

    cy.wait('@fetchAccountsError');

    cy.getByTestId('account-viewer').should(
      'contain.text',
      'No accounts available.'
    );
  });
});
