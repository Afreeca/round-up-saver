import React from 'react';
import { fetchAccounts } from '../../src/api/account';
import Loader from '../../src/components/Loader';
import { getStore } from '../../src/redux/store';
import { API_REQUEST_HELPER } from '../helpers/apiRequestHelpers';
import { ApiAction } from '../support';

describe('Loader', () => {
  const store = getStore();
  before(() => {
    cy.mount(<Loader />, { reduxStore: store });
  });

  it('Spinner should be display while fetching accounts', () => {
    store.dispatch(fetchAccounts.pending('accounts/fetchAccounts/pending'));
    cy.getByTestId('spinner').should('exist');
    cy.getByTestId('spinner').should('be.visible');
  });

  API_REQUEST_HELPER.map(({ action, title }) => {
    it(`Spinner should not be display when ${title} fails`, () => {
      cy.mockApiResponseError(action as ApiAction<unknown>);
      store.dispatch(fetchAccounts.rejected(new Error(''), '1'));
      cy.getByTestId('spinner').should('not.exist');
    });
  });
});
