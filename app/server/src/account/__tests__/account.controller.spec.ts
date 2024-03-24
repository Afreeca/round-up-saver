import { TokenManagementService } from './../../security/TokenManagementService';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import { ConfigService } from '../../config/customConfig';
import { HttpModule } from '@nestjs/axios';
import { ACCOUNT_INFO, SAVING_ACCOUNTS_INFO } from './stubs/accounts';
import { BALANCE_INFO } from './stubs/balance';
import { TRANSACTIONS_INFO } from './stubs/transaction';
import { TransactionInput } from '@account/dto/transaction.dto';
import { TransferSaving } from '@account/dto/transfer.dto';

describe('AccountController', () => {
  let controller: AccountController;

  const mockAccountService = {
    getUserAccounts: jest.fn(() => {
      return ACCOUNT_INFO;
    }),
    getAccountBalance: jest.fn((accountUid: string) => {
      return BALANCE_INFO[accountUid as keyof typeof BALANCE_INFO];
    }),
    getTransactions: jest.fn((transactionInput: TransactionInput) => {
      return TRANSACTIONS_INFO[transactionInput.accountUid as keyof typeof TRANSACTIONS_INFO];
    }),
    transferToSaving: jest.fn((transferData: TransferSaving) => {
      return SAVING_ACCOUNTS_INFO[transferData.accountUid as keyof typeof SAVING_ACCOUNTS_INFO];
    })
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService, ConfigService, TokenManagementService, Logger],
      imports: [HttpModule]
    })
      .overrideProvider(AccountService)
      .useValue(mockAccountService)
      .compile();

    controller = app.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an list of account', async () => {
    const result = await controller.getAccounts();
    expect(mockAccountService.getUserAccounts).toHaveBeenCalled();
    expect(result).toEqual(ACCOUNT_INFO);
  });

  it('should return an account balance', async () => {
    const accountUid = '1';
    const result = await controller.getBalance(accountUid);
    const expected = BALANCE_INFO[accountUid as keyof typeof BALANCE_INFO];
    expect(mockAccountService.getAccountBalance).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should return an account balance', async () => {
    const accountUid = '2';
    const result = await controller.getBalance(accountUid);
    const expected = BALANCE_INFO[accountUid as keyof typeof BALANCE_INFO];
    expect(mockAccountService.getAccountBalance).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should return a list of transactions', async () => {
    const input: TransactionInput = {
      accountUid: '1',
      categoryUid: 'cagetory',
      changesSince: '2024-03-25T10:00:00Z'
    };

    const result = await controller.getTransaction(input);
    const expected = TRANSACTIONS_INFO[input.accountUid as keyof typeof TRANSACTIONS_INFO];
    expect(mockAccountService.getTransactions).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should return a saving accounts information', async () => {
    const input: TransferSaving = {
      accountUid: '1',
      savingsGoalUid: '1',
      amount: {
        currency: 'GBP',
        minorUnits: 312
      }
    };
    const result = await controller.transferToSaving(input);
    const expected = SAVING_ACCOUNTS_INFO[input.accountUid as keyof typeof SAVING_ACCOUNTS_INFO];

    expect(mockAccountService.transferToSaving).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
