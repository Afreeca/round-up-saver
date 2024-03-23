import React, { useMemo, useState } from 'react';
import { RoundUpInfo } from './types';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { getStartOfWeek } from 'utils/date';
import InfoIcon from './InfoIcon';
import { roundUpInfo } from 'utils/constants';
import Modal from './Modal';
import { RootState } from 'redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { TRANSACTION_COLUMNS } from 'utils/common';
import { fetchWeeklyRoundUp } from 'api/account';
import RoundUp from './RounUp';
import TransferToSavings from './TransferToSavings';

const ViewTransactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector(
    (state: RootState) => state.accounts
  );
  const selectedAccount = useAppSelector(
    (state: RootState) => state.accounts.selectedAccount
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // State to manage current step
  const [roundupInfo, setRoundupInfo] = useState<RoundUpInfo>();

  const columns = useMemo(() => TRANSACTION_COLUMNS, []);

  const table = useMaterialReactTable({
    data: transactions,
    columns,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  const handleRoundUp = async () => {
    dispatch(
      fetchWeeklyRoundUp({
        accountUid: selectedAccount.accountUid,
        categoryUid: selectedAccount.defaultCategory,
        changesSince: getStartOfWeek(),
      })
    ).then((data) => {
      setRoundupInfo(data.payload as RoundUpInfo);
      setIsModalOpen(true);
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentStep(1); // Reset
  };

  if (transactions.length <= 0) {
    return null;
  }

  return (
    <>
      {transactions?.length > 0 ? (
        <div className='bg-stone-50 flex flex-col gap-2 z-50'>
          <div className='w-full flex flex-col'>
            <h5 className='flex justify-center'>This week transactions</h5>
            <MaterialReactTable table={table} />
          </div>

          <div className='flex gap-1 items-center'>
            <button
              className='text-sm font-semibold bg-lime-700 text-white rounded-full px-6 py-3'
              type='button'
              onClick={handleRoundUp}
            >
              Round up
            </button>
            <InfoIcon text={roundUpInfo} />
          </div>
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            title={
              currentStep === 1
                ? 'Weekly Savings Roundup'
                : 'Transfer to Savings'
            }
          >
            {currentStep === 1 ? (
              <RoundUp
                {...roundupInfo}
                onCancel={handleModalClose}
                onNextStep={handleNextStep}
              />
            ) : (
              <TransferToSavings
                savingAccounts={roundupInfo.savingAccounts}
                totalRoundUpAmount={roundupInfo.totalRoundUpAmount}
                onCancel={handleModalClose}
              />
            )}
          </Modal>
        </div>
      ) : (
        !loading && <p>No transactions available.</p>
      )}
    </>
  );
};

export default ViewTransactions;
