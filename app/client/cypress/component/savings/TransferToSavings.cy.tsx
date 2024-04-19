import TransferToSavings from 'components/savings/TransferToSavings';
import { SavingAccount } from 'components/types';
import React from 'react';

describe('TransferToSavings', () => {
  let accounts: SavingAccount[];

  before(() => {
    cy.fixture('savingAccounts.json').then((acc) => {
      accounts = acc;
    });
  });

  it('should display saving transfer information', () => {
    const onCancelSpy = cy.spy().as('onCancel');

    const roundUpAmount = 0.7;

    cy.mount(
      <TransferToSavings
        onCancel={onCancelSpy}
        savingAccounts={accounts}
        totalRoundUpAmount={roundUpAmount}
      />,
      { centralised: true }
    );

    cy.getByTestId('transferToSaving').should('exist');
  });
});
