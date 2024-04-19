import React from 'react';
import { addSavings } from '../../src/api/account';
import Messages from '../../src/components/Messages';
import { getStore } from '../../src/redux/store';
import { API_REQUEST_HELPER } from '../helpers/apiRequestHelpers';

describe('Messages', () => {
  const store = getStore();
  beforeEach(() => {
    cy.mount(<Messages />, { reduxStore: store });
  });

  API_REQUEST_HELPER.map(
    ({ title, errorMessage, requestId, args, payload, action }) => {
      it(`Should display ${title} error message`, () => {
        store.dispatch(action.rejected(errorMessage, requestId, args, payload));
        cy.getByTestId('messages').should('contain.text', payload);
        cy.get('.MuiAlert-message').should(
          'have.css',
          'color',
          'rgb(95, 33, 32)'
        );
      });
    }
  );

  it('Should display successful transfer to saving message', () => {
    const successfulMessage =
      'Amount successfully transferred to savings account.';

    store.dispatch(
      addSavings.fulfilled(
        {
          transferUid: '',
          success: true,
        },
        '',
        {
          accountUid: '',
          savingsGoalUid: '',
          amount: { currency: '', minorUnits: 1 },
        }
      )
    );

    cy.getByTestId('messages').should('have.text', successfulMessage);
    cy.get('.MuiAlert-message').should('have.css', 'color', 'rgb(30, 70, 32)');
  });
});
