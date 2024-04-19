/// <reference types="cypress" />

import { mount } from 'cypress/react18';
import { ApiAction } from '.';
import { getStore } from '../../src/redux/store';

Cypress.Commands.add('mount', mount);

Cypress.Commands.add(
  'mockApiResponseError',
  <TPayload>(apiAction: ApiAction<TPayload>, error: string = '') => {
    const store = getStore(); // Get the store using getStore
    cy.wrap(store.dispatch(apiAction.rejected(new Error(error), '1')));
  }
);

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`);
});
