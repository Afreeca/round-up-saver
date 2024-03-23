import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { TRANSACTION_COLUMNS } from 'utils/common';

const TransactionTable = () => {
  const { transactions } = useAppSelector((state: RootState) => state.accounts);

  const columns = useMemo(() => TRANSACTION_COLUMNS, []);

  const table = useMaterialReactTable({
    data: transactions,
    columns,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <div className='w-full flex flex-col'>
      <h5 className='flex justify-center'>This week transactions</h5>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default TransactionTable;
