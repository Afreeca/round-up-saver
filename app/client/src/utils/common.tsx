import { Direction } from 'components/types';
import { fDateTimeBritish } from './date';
import React from 'react';

const getRowColor = (direction: Direction) => {
  if (direction === Direction.IN) {
    return 'text-green-600';
  } else if (direction === Direction.OUT) {
    return 'text-red-600';
  } else {
    return '';
  }
};

export const TRANSACTION_COLUMNS = [
  {
    accessorKey: 'direction',
    header: 'Direction',
    Cell: ({ renderedCellValue }: { renderedCellValue: any; row: any }) => (
      <div className={`${getRowColor(renderedCellValue)}`}>
        <span>{renderedCellValue}</span>
      </div>
    ),
  },
  {
    accessorKey: 'spendingCategory',
    header: 'Category',
  },
  {
    accessorKey: 'transactionTime',
    header: 'Transaction Time',
    Cell: ({ renderedCellValue }: { renderedCellValue: any; row: any }) => (
      <div>
        <span>{fDateTimeBritish(renderedCellValue)}</span>
      </div>
    ),
  },
  {
    accessorKey: 'country',
    header: 'Currency',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
