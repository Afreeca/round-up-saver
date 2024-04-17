import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useMemo } from 'react';
import { TRANSACTION_COLUMNS } from 'utils/common';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const TransactionTable = () => {
  const transactions = useAppSelector(
    (state: RootState) => state.accounts.transactions
  );

  const columns = useMemo(() => TRANSACTION_COLUMNS, []);

  const table = useMaterialReactTable({
    data: transactions || [],
    columns,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return transactions?.length > 0 ? (
    <div
      className='w-full flex flex-col'
      data-cy='transaction-table'
    >
      <h5 className='flex justify-center'>This week transactions</h5>
      <MaterialReactTable table={table} />
    </div>
  ) : null;
};

export default TransactionTable;
