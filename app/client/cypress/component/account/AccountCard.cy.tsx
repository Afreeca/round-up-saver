import React from 'react';
import { fDate } from 'utils/date';
import AccountCard from '../../../src/components/account/AccountCard';
import { getStore } from '../../../src/redux/store';

describe('Account Card', () => {
  const store = getStore();
  let account;
  beforeEach(() => {
    cy.fixture('accounts.json').then((acc) => {
      account = acc[0];
      cy.mount(<AccountCard data={account} />, { reduxStore: store });
    });
  });

  it('displays the account name', () => {
    cy.getByTestId('account-card').should('be.visible').as('accountCard');
    cy.get('@accountCard').contains('Account Information').should('be.visible');

    cy.get('@accountCard')
      .contains(`Name: ${account!.name}`)
      .should('be.visible');

    cy.get('@accountCard')
      .contains(`Currency: ${account!.currency}`)
      .should('be.visible');

    cy.get('@accountCard')
      .contains(`Type: ${account!.accountType}`)
      .should('be.visible');

    cy.get('@accountCard')
      .contains(`Created: ${fDate(account!.createdAt)}`)
      .should('be.visible');

    cy.getByTestId('account-card')
      .find('button')
      .contains('View transactions')
      .should('be.visible');
  });
});
