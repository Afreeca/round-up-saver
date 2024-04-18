import { fetchWeeklyRoundUp } from 'api/account';
import React, { useState } from 'react';
import { RootState } from 'redux/store';
import { roundUpInfo } from 'utils/constants';
import { getStartOfWeek } from 'utils/date';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import InfoIcon from '../InfoIcon';
import Modal from '../Modal';
import RoundUp from '../savings/RounUp';
import TransferToSavings from '../savings/TransferToSavings';
import { RoundUpInfo } from '../types';
import TransactionTable from './TransactionTable';

const ViewTransactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state: RootState) => state.accounts.transactions
  );

  const selectedAccount = useAppSelector(
    (state: RootState) => state.accounts.selectedAccount
  );

  const isLoading = useAppSelector(
    (state: RootState) => state.accounts.loading
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [roundupInfo, setRoundupInfo] = useState<RoundUpInfo>();

  const handleRoundUp = async () => {
    if (!selectedAccount) {
      return;
    }
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
    setCurrentStep(1); // reset steps
  };

  if (!selectedAccount) {
    return null;
  }

  return (
    <>
      {transactions?.length > 0 ? (
        <div className='bg-stone-50 flex flex-col gap-2 z-50'>
          <TransactionTable />
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
                {...roundupInfo}
                onCancel={handleModalClose}
              />
            )}
          </Modal>
        </div>
      ) : (
        !isLoading && (
          <div className='flex  justify-center m-5'>
            <p>No transactions available.</p>
          </div>
        )
      )}
    </>
  );
};

export default ViewTransactions;
