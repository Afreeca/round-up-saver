import { Direction } from 'components/types';
import React from 'react';
import { fDateTimeBritish } from './date';

export const getDirectionColor = (direction: Direction) => {
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
      <div className={`${getDirectionColor(renderedCellValue)}`}>
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

export const isObjectEmpty = (obj: any) => {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  if (typeof obj === 'string') {
    return obj.trim().length === 0;
  }

  if (typeof obj === 'object' && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};
