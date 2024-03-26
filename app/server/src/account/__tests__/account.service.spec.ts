import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AccountService } from '../account.service';
import { ConfigService } from '../../config/customConfig';
import { TokenManagementService } from '../../security/TokenManagementService';
import { Logger } from '@nestjs/common';
import { AccountInfo, SavingAccountInfo } from '@account/entities/account';
import { ACCOUNT_INFO, SAVING_ACCOUNTS_INFO } from './stubs/accounts';
import { BALANCE_INFO } from './stubs/balance';
import { BalanceInfo } from '@account/entities/balance';
import { TransactionInfo } from '@account/entities/transaction';
import { TRANSACTIONS_INFO } from './stubs/transaction';
import { TransactionInput } from '@account/dto/transaction.dto';
import { TransferSaving } from '@account/dto/transfer.dto';
import { UuidGenerator } from '@config/uuidGenerator';

function createMockResponse<T>(data: T, status = 200, statusText = 'OK'): AxiosResponse<T> {
  const emptyHeaders: any = {};
  return {
    data,
    headers: {},
    config: { url: '/mockUrl', headers: emptyHeaders },
    status,
    statusText
  };
}

describe('AccountService', () => {
  let service: AccountService;
  let httpService: HttpService;
  const mockTokenService = { getAccessToken: jest.fn().mockResolvedValue('mock-access-token') };
  const mockConfigService = { getStarHost: 'http://localhost:3000/mockUrl' };
  const mockUuidGenerator = {
    generateUUID: jest.fn().mockReturnValue('mock-uuid')
  };

  const setupTestingModule = async () => {
    httpService = mock<HttpService>();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AccountService,
        ConfigService,
        { provide: UuidGenerator, useValue: mockUuidGenerator },
        { provide: ConfigService, useValue: mockConfigService },
        TokenManagementService,
        Logger,
        { provide: HttpService, useValue: httpService },
        { provide: TokenManagementService, useValue: mockTokenService }
      ],
      imports: []
    }).compile();

    service = module.get<AccountService>(AccountService);
  };

  beforeEach(async () => {
    await setupTestingModule();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get Accounts', () => {
    it('should return a list of user accounts', async () => {
      const mockResponse: AxiosResponse<AccountInfo> = createMockResponse(ACCOUNT_INFO);

      httpService.get = jest.fn().mockReturnValue(of(mockResponse));
      const userAccounts = await service.getUserAccounts();

      expect(httpService.get).toHaveBeenCalledWith(`${mockConfigService.getStarHost}/api/v2/accounts`, {
        headers: { Accept: 'application/json', Authorization: 'Bearer mock-access-token' }
      });
      expect(userAccounts).toEqual(ACCOUNT_INFO);
    });
  });

  describe('Get AccountBalance', () => {
    it('should return account balance', async () => {
      const accountUid = '1';
      const mockResponse: AxiosResponse<BalanceInfo> = createMockResponse(BALANCE_INFO[accountUid]);

      httpService.get = jest.fn().mockReturnValue(of(mockResponse));

      const balance = await service.getAccountBalance(accountUid);

      expect(httpService.get).toHaveBeenCalledWith(
        `${mockConfigService.getStarHost}/api/v2/accounts/${accountUid}/balance`,
        {
          headers: { Accept: 'application/json', Authorization: 'Bearer mock-access-token' }
        }
      );
      expect(balance).toEqual(BALANCE_INFO[1]);
    });
  });

  describe('Get Transaction', () => {
    const input: TransactionInput = {
      accountUid: '1',
      categoryUid: 'cagetory',
      changesSince: '2024-03-25T10:00:00Z'
    };
    it('should return transactions', async () => {
      const mockResponse: AxiosResponse<TransactionInfo> = createMockResponse(TRANSACTIONS_INFO['1']);

      httpService.get = jest.fn().mockReturnValue(of(mockResponse));

      const balance = await service.getTransactions(input);

      expect(httpService.get).toHaveBeenCalledWith(
        `${mockConfigService.getStarHost}/api/v2/feed/account/${input.accountUid}/category/${input.categoryUid}?changesSince=${input.changesSince}`,
        {
          headers: { Accept: 'application/json', Authorization: 'Bearer mock-access-token' }
        }
      );
      expect(balance).toEqual(TRANSACTIONS_INFO[1]);
    });
  });

  describe('Get Savings', () => {
    const accountUid = '1';
    it('should return transactions', async () => {
      const mockResponse: AxiosResponse<SavingAccountInfo> = createMockResponse(SAVING_ACCOUNTS_INFO['1']);

      httpService.get = jest.fn().mockReturnValue(of(mockResponse));

      const balance = await service.getSavingsAccount(accountUid);

      expect(httpService.get).toHaveBeenCalledWith(
        `${mockConfigService.getStarHost}/api/v2/account/${accountUid}/savings-goals`,
        {
          headers: { Accept: 'application/json', Authorization: 'Bearer mock-access-token' }
        }
      );
      expect(balance).toEqual(SAVING_ACCOUNTS_INFO[1]);
    });
  });

  describe('Get Savings', () => {
    const input: TransferSaving = {
      accountUid: '1',
      savingsGoalUid: '1',
      amount: {
        currency: 'GBP',
        minorUnits: 312
      }
    };
    it('should return saving info', async () => {
      const mockResponse: AxiosResponse<SavingAccountInfo> = createMockResponse(SAVING_ACCOUNTS_INFO['1']);
      const uuid = 'mock-uuid';
      httpService.put = jest.fn().mockReturnValue(of(mockResponse));

      const balance = await service.transferToSaving(input);

      expect(httpService.put).toHaveBeenCalledWith(
        `${mockConfigService.getStarHost}/api/v2/account/${input.accountUid}/savings-goals/${input.savingsGoalUid}/add-money/${uuid}`,
        { amount: input.amount },
        {
          headers: { Accept: 'application/json', Authorization: 'Bearer mock-access-token' }
        }
      );
      expect(balance).toEqual(SAVING_ACCOUNTS_INFO[1]);
    });
  });
});
