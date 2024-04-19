import InfoIcon from 'components/InfoIcon';
import React from 'react';
import { roundUpInfo } from 'utils/constants';

describe('InfoIcon', () => {
  it('should display the info icon    ', () => {
    cy.mount(<InfoIcon text={roundUpInfo} />, { centralised: true });

    // before hover
    cy.getByTestId('infoIcon').should('exist').find('svg').as('icon');
    cy.get('infoText').should('not.exist');

    cy.getByTestId('infoIcon').trigger('mouseover');

    // during hover
    cy.getByTestId('infoText')
      .as('text')
      .should('be.visible')
      .and('have.text', roundUpInfo)
      .find('svg')
      .should('be.visible');

    cy.wait(400);

    cy.getByTestId('infoIcon').trigger('mouseout');

    // after hover
    cy.get('@text').should('not.exist');
    cy.getByTestId('infoIcon').should('exist').find('svg').as('icon');
  });
});
