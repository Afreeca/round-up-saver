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
import { AccountInfo } from '@account/entities/account';

describe('AccountController', () => {
  let controller: AccountController;

  const mockAccountService = {
    getUserAccounts: jest.fn().mockResolvedValue(ACCOUNT_INFO),
    getAccountBalance: jest.fn((accountUid: string) =>
      Promise.resolve(BALANCE_INFO[accountUid as keyof typeof BALANCE_INFO])
    ),
    getTransactions: jest.fn((transactionInput: TransactionInput) =>
      Promise.resolve(TRANSACTIONS_INFO[transactionInput.accountUid as keyof typeof TRANSACTIONS_INFO])
    ),
    transferToSaving: jest.fn((transferData: TransferSaving) =>
      Promise.resolve(SAVING_ACCOUNTS_INFO[transferData.accountUid as keyof typeof SAVING_ACCOUNTS_INFO])
    )
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

  describe('Get Account', () => {
    it('should return an list of account', async () => {
      const result = await controller.getAccounts();
      expect(mockAccountService.getUserAccounts).toHaveBeenCalled();
      expect(result).toEqual(ACCOUNT_INFO);
    });

    it('should handle empty list of accounts', async () => {
      const emptyAccountInfo: AccountInfo[] = [];
      mockAccountService.getUserAccounts.mockResolvedValue(emptyAccountInfo as unknown as never);
      const result = await controller.getAccounts();
      expect(result).toEqual(emptyAccountInfo);
    });
  });

  describe('Get Balance', () => {
    it('should return an account balance', async () => {
      const accountUid = '1';
      const result = await controller.getBalance(accountUid);
      const expected = BALANCE_INFO[accountUid as keyof typeof BALANCE_INFO];
      expect(mockAccountService.getAccountBalance).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });

    it('should throw error when getting balance', async () => {
      const accountUid = 'unknowUid';

      mockAccountService.getAccountBalance.mockRejectedValueOnce(new Error('Failed to retrieve balance') as never);
      await expect(controller.getBalance(accountUid)).rejects.toThrow(new Error('Failed to retrieve balance'));
      expect(mockAccountService.getAccountBalance).toHaveBeenCalledWith(accountUid);
    });
  });

  describe('Get Transactions', () => {
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

    it('should return empty transactions', async () => {
      const nullTransactionInput: TransactionInput = {
        accountUid: '3',
        categoryUid: 'category',
        changesSince: '2024-03-25T10:00:00Z'
      };
      const emptyTransactions: any = [];
      mockAccountService.getTransactions.mockResolvedValueOnce(emptyTransactions);

      const result = await controller.getTransaction(nullTransactionInput);
      expect(result).toEqual([]);
    });

    it('should throw error when getting transactions', async () => {
      const input: TransactionInput = {
        accountUid: '1',
        categoryUid: 'category',
        changesSince: '2024-03-25T10:00:00Z'
      };

      mockAccountService.getTransactions.mockRejectedValueOnce(new Error('Failed to retrieve transactions') as never);
      await expect(controller.getTransaction(input)).rejects.toThrowError('Failed to retrieve transactions');
      expect(mockAccountService.getTransactions).toHaveBeenCalledWith(input);
    });
  });

  describe('Add to saving', () => {
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

    it('should handle errors when saving account', async () => {
      const input: TransferSaving = {
        accountUid: '2',
        savingsGoalUid: '1',
        amount: {
          currency: 'GBP',
          minorUnits: 312
        }
      };

      mockAccountService.transferToSaving.mockRejectedValueOnce(new Error('Failed to add to saving') as never);
      await expect(controller.transferToSaving(input)).rejects.toThrowError('Failed to add to saving');
      expect(mockAccountService.transferToSaving).toHaveBeenCalledWith(input);
    });
  });
});
