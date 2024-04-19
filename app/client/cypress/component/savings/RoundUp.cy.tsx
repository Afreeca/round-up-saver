import RoundUp from 'components/savings/RounUp';
import { SavingAccount } from 'components/types';
import React from 'react';

describe('RoundUp', () => {
  let accounts: SavingAccount[];

  before(() => {
    cy.fixture('savingAccounts.json').then((acc) => {
      accounts = acc;
    });
  });

  it('should display he roundup information', () => {
    const onCancelSpy = cy.spy().as('onCancel');
    const onNextStepSpy = cy.spy().as('onNextStep');
    const roundUpAmount = 0.7;

    cy.mount(
      <RoundUp
        onCancel={onCancelSpy}
        onNextStep={onNextStepSpy}
        savingAccounts={accounts}
        totalRoundUpAmount={roundUpAmount}
      />,
      { centralised: true }
    );

    cy.getByTestId('roundUp')
      .should('exist')
      .first()
      .find('span')
      .first()
      .should('have.text', `Total Roundup Amount:${roundUpAmount}`)
      .parent()
      .find('p')
      .should(
        'have.text',
        'Would you like to transfer this amount to your savings goal?'
      )

      .get('.MuiDialogActions-root')
      .find('button')
      .should('have.length', 2)
      .eq(0)
      .contains('No')
      .and('have.class', 'MuiButton-outlined')
      .click();

    cy.get('@onCancel').should('have.been.called');

    cy.get('.MuiDialogActions-root')
      .find('button')
      .eq(1)
      .contains('Yes')
      .and('have.class', 'MuiButton-contained')
      .click();

    cy.get('@onNextStep').should('have.been.called');
  });
});
