import React from 'react';
import Header from '../../src/components/Header';

describe('Test header', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('header should display', () => {
    cy.get('[data-cy=header]').should('exist');
  });

  it('alt text should display when image src not found', () => {
    cy.get('[data-cy="header"] img').invoke('removeAttr', 'src');
    cy.get('[data-cy=header] img').should('have.attr', 'alt', 'starling logo');
  });

  it('logo should display', () => {
    cy.get('[data-cy=header] img').should('attr', 'src', 'assets/logo.svg');
    cy.get('[data-cy="header"] img')
      .should('have.attr', 'src')
      .and('not.be.empty');
  });
});
