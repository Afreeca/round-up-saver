// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
import { getStore } from '../../src/redux/store';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const CentralisedWrapper = ({ children }) => (
  <div className='flex justify-center items-center h-screen'>{children}</div>
);

Cypress.Commands.add('mount', (component, options = {}) => {
  // Use the default store if one is not provided
  const { reduxStore = getStore(), centralised, ...mountOptions } = options;

  const wrappedComponent = <Provider store={reduxStore}>{component}</Provider>;

  if (centralised) {
    const container = document.createElement('div');
    ReactDOM.render(
      <CentralisedWrapper>{wrappedComponent}</CentralisedWrapper>,
      container
    );
    document.body.appendChild(container);
    return cy.wrap(container);
  } else {
    return mount(wrappedComponent, mountOptions);
  }
});
