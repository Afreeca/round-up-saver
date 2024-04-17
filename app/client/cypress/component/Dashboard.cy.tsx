import React from 'react';
import { fetchAccounts } from '../../src/api/account';
import Dashboard from '../../src/components/Dashboard';
import { getStore } from '../../src/redux/store';

describe('Account Viewer', () => {
  const store = getStore();
  beforeEach(() => {
    store.dispatch(fetchAccounts());
    cy.mount(<Dashboard />, { reduxStore: store });
  });

  it('renders loading state initially', () => {
    store.dispatch(fetchAccounts.pending('accounts/fetchAccounts/pending'));
    cy.getByTestId('spinner').should('be.visible');
  });
});
