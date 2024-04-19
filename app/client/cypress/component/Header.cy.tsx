import React from 'react';
import Header from '../../src/components/Header';

describe('Test header', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('header should display the information correctly', () => {
    cy.getByTestId('header')
      .find('a')
      .should('exist')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href')
      .should('not.be.empty')
      .and('include', 'https://www.starlingbank.com/');

    cy.getByTestId('header')
      .should('exist')
      .find('img')
      .should('have.attr', 'alt', 'starling logo')
      .and('have.attr', 'src', 'assets/logo.svg')
      .should('have.attr', 'src')
      .and('not.be.empty');
  });
});
