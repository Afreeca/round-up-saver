import React from 'react';
import { AccountProps } from './types';
import { fDate, getStartOfWeek } from 'utils/date';

const Account = ({ data, onFetchTransactions }: AccountProps) => { 

  return (
    <div className="bg-white rounded-lg shadow-md">
        <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
            <div className="py-2">
                <p className="text-sm text-gray-600">Name: {data.name}</p>
                <p className="text-sm text-gray-600">Currency: {data.currency}</p>
                <p className="text-sm text-gray-600">Type: {data.accountType}</p>
                <p className="text-sm text-gray-600">Created: {fDate(data.createdAt)}</p>
            </div>
        </div>
        <div className="bg-gray-200 px-4 p-3 flex justify-end">
            <button 
                className="text-sm font-semibold text-lime-800 hover:text-gray-900" 
                onClick={() => onFetchTransactions({
                    accountUid: data.accountUid,
                    categoryUid: data.defaultCategory,
                    changesSince: getStartOfWeek()
                })}
            >
                View transactions
            </button>
        </div>
    </div>
  );
};

export default Account;
