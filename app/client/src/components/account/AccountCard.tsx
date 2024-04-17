import { fetchTransactions } from 'api/account';
import React from 'react';
import { fDate, getStartOfWeek } from 'utils/date';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedAccount } from '../../redux/slides/accountsSlice';
import { AccountProps, TransactionDetails } from '../types';

const Account = ({ data }: AccountProps) => {
  const dispatch = useAppDispatch();

  const handleFetchTransactions = async (
    transactionData: TransactionDetails
  ) => {
    dispatch(setSelectedAccount(data));
    dispatch(fetchTransactions(transactionData));
  };

  return (
    <div
      className='bg-white rounded-lg shadow-md'
      data-cy='account-card'
    >
      <div className='p-4'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Account Information
        </h2>
        <div className='py-2'>
          <p className='text-sm text-gray-600'>Name: {data.name}</p>
          <p className='text-sm text-gray-600'>Currency: {data.currency}</p>
          <p className='text-sm text-gray-600'>Type: {data.accountType}</p>
          <p className='text-sm text-gray-600'>
            Created: {fDate(data.createdAt)}
          </p>
        </div>
      </div>
      <div className='bg-gray-200 px-4 p-3 flex justify-end'>
        <button
          className='text-sm font-semibold text-lime-800 hover:text-gray-900'
          onClick={() =>
            handleFetchTransactions({
              accountUid: data.accountUid,
              categoryUid: data.defaultCategory,
              changesSince: getStartOfWeek(),
            })
          }
        >
          View transactions
        </button>
      </div>
    </div>
  );
};

export default Account;
