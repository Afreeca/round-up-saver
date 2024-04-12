import { DialogActions } from '@mui/material';
import React from 'react';
import Modal from '../../src/components/Modal';

describe('Modal component', () => {
  beforeEach(() => {
    const onCloseSpy = cy.spy().as('onClose');
    const modalTitle = 'Test Modal';

    cy.mount(
      <Modal
        open={true}
        title={modalTitle}
        onClose={onCloseSpy}
        data-cy='modal'
      >
        <div data-cy='modal-content'>
          <p>Modal Content</p>
        </div>
        <div>
          <DialogActions>
            <button
              onClick={onCloseSpy}
              color='success'
              data-cy='closeModal'
            >
              Close
            </button>
          </DialogActions>
        </div>
      </Modal>
    );
  });

  it('renders modal with title and children', () => {
    cy.get('.MuiBox-root > .MuiTypography-root').should(
      'have.text',
      'Test Modal'
    );
    cy.get('[data-cy=modal-content]').should('have.text', 'Modal Content');
    cy.get('button').should('have.text', 'Close');
    cy.get('[data-cy=closeModal]').click();
    cy.get('@onClose').should('have.been.calledOnce');
  });
});
