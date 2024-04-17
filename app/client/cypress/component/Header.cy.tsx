import React from 'react';
import Header from '../../src/components/Header';

describe('Test header', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('header should display', () => {
    cy.getByTestId('header').should('exist');
  });

  it('alt text should display when image src not found', () => {
    cy.getByTestId('header').find('img').invoke('removeAttr', 'src');
    cy.getByTestId('header')
      .find('img')
      .should('have.attr', 'alt', 'starling logo');
  });

  it('logo should display', () => {
    cy.getByTestId('header')
      .find('img')
      .should('attr', 'src', 'assets/logo.svg');
    cy.getByTestId('header')
      .find('img')
      .should('have.attr', 'src')
      .and('not.be.empty');
  });
});
