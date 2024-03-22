
import React, { useMemo, useState } from 'react';
import { Direction } from './types';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { fDateTimeBritish } from 'utils/date';
import InfoIcon from './InfoIcon';
import { roundUpInfo } from 'utils/constants';
import { roundUpWeeklyTransactions } from 'api/account';
import { useAccountsContext } from 'context/AccountContext';
import Modal from './Modal';

const getRowColor = (direction: Direction) => {
  if (direction === Direction.IN) {
    return "text-green-600";
  } else if (direction=== Direction.OUT) {
    return "text-red-600";
  } else {
    return "";
  }
};

const  ViewTransactions = ()  => {
  const { transactions, selectedAccount } = useAccountsContext(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roundupAmount, setRoundupAmount] = useState<number>(0);

  const columns = useMemo(
    () => [
      {
        accessorKey: "direction",
        header: "Direction",
        Cell: ({ renderedCellValue }: {renderedCellValue: any, row:any}) => (
            <div className={`${getRowColor(renderedCellValue)}`}>
              <span>{renderedCellValue}</span>
            </div>
        )
      },
      {
        accessorKey: "spendingCategory",
        header: "Category"
      },
      {
        accessorKey: "transactionTime",
        header: "Transaction Time",
        Cell: ({ renderedCellValue }: {renderedCellValue: any, row:any}) => (
          <div>
            <span>{fDateTimeBritish(renderedCellValue)}</span>
          </div>
      )
      },
      {
        accessorKey: "country",
        header: "Currency"
      },
      {
        accessorKey: "status",
        header: "Status"
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    data: transactions,
    columns,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });


  const handleRoundUp = async() => {
    const result = await roundUpWeeklyTransactions(selectedAccount)
    setRoundupAmount(result)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-stone-50 flex flex-col gap-2 z-50">
      <div className='w-full flex flex-col'>
        <h5 className='flex justify-center'>This week transactions</h5>
        <MaterialReactTable table={table} />
      </div>
    
      <div className='flex gap-1 items-center'>
        <button 
          className="text-sm font-semibold bg-lime-700 text-white rounded-full px-6 py-3"
          type="button"
          onClick={handleRoundUp} 
        >
          Round up
        </button>
        <InfoIcon text={roundUpInfo}/>
      </div>
      <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => null}
          title='Weekly Savings Roundup'
        >
          <div>
            <span className='text-base font-bold'>
              Total Roundup Amount: 
              <span className='font-bold text-lg text-green-700'>
                {roundupAmount}
              </span>
            </span> 
            <p>Would you like to transfer this amount to your savings goal?</p>
          </div>
        </Modal>
    </div>
  );
}

export default ViewTransactions;
