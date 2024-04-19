import React from 'react';
import { fDate } from 'utils/date';
import AccountCard from '../../../src/components/account/AccountCard';

describe('Account Card', () => {
  it('Should display the card information', () => {
    cy.fixture('accounts.json').then((accounts) => {
      const account = accounts[0];
      cy.mount(<AccountCard data={account} />);

      cy.getByTestId('account-card').should('be.visible').as('accountCard');
      cy.get('@accountCard')
        .contains('Account Information')
        .should('be.visible');

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

  it('Should not display the card if account data not present', () => {
    cy.mount(<AccountCard data={undefined} />);
    cy.getByTestId('account-card').should('not.exist');
  });
});
