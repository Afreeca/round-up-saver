import { fetchTransactions } from 'api/account';
import { Account, TransactionItem } from 'components/types';
import { TRANSACTION_COLUMNS } from 'utils/common';
import { fDateTimeBritish } from 'utils/date';

export const testAccountHasTransaction = (
  transactions: TransactionItem[],
  account: Account,
  store: any
) => {
  store.dispatch(
    fetchTransactions.fulfilled({ feedItems: transactions }, '', {
      accountUid: account.accountType,
      categoryUid: account.defaultCategory,
      changesSince: account.createdAt,
    })
  );

  cy.getByTestId('transaction-table')
    .should('exist')
    .find('h5')
    .contains(/This week transactions/i)
    .should('be.visible');

  cy.getByTestId('transaction-table').should('exist').as('transactionTable');

  // selects all table rows (<tr>) within the table body (<tbody>) and iterates over each row
  cy.get('tbody tr').each(($row, rowIndex) => {
    // Get the expected current row data from the transaction list
    const rowData = transactions[rowIndex];
    // Iterate over each column in the row
    TRANSACTION_COLUMNS.forEach((column, columnIndex) => {
      const columnKey = column.accessorKey;
      // for the same index assert that the <th> array in a specific index is the same as the one in TRANSACTION_COLUMNS array
      cy.get('th').eq(columnIndex).should('contain.text', column.header);

      // Get the cell element in the current row and column, ensures that the value displayed in the table matches the expected value.
      cy.wrap($row).within(() => {
        // If the column is 'transactionTime', it formats the date using the fDateTimeBritish function before assigning it to value.
        const value =
          columnKey !== 'transactionTime'
            ? rowData[columnKey as keyof TransactionItem]
            : fDateTimeBritish(rowData[columnKey]);

        cy.get('td').eq(columnIndex).should('contain.text', value);
      });
    });
  });
};
