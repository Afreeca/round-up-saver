import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AccountService } from '../account.service';
import { ConfigService } from '../../config/customConfig';
import { TokenManagementService } from '../../security/TokenManagementService';
import { Logger } from '@nestjs/common';
import { AccountInfo } from '@account/entities/account';
import { ACCOUNT_INFO } from './stubs/accounts';

describe('AccountService', () => {
  let service: AccountService;
  let httpService: HttpService;
  const mockTokenService = { getAccessToken: jest.fn().mockResolvedValue('mock-access-token') };
  const mockConfigService = { getStarHost: 'http://localhost:3000/mockUrl' };

  const mockHttpService = () => {
    const httpService = mock<HttpService>();
    const emptyHeaders: any = {};
    const mockResponse: AxiosResponse<AccountInfo> = {
      data: ACCOUNT_INFO,
      headers: {},
      config: { url: `${mockConfigService.getStarHost}/api/v2/accounts`, headers: emptyHeaders },
      status: 200,
      statusText: 'OK'
    };
    httpService.get.mockImplementationOnce(() => of(mockResponse));
    return httpService;
  };

  const setupTestingModule = async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AccountService,
        ConfigService,
        { provide: ConfigService, useValue: mockConfigService },
        TokenManagementService,
        Logger,
        { provide: HttpService, useFactory: mockHttpService },
        { provide: TokenManagementService, useValue: mockTokenService }
      ],
      imports: []
    }).compile();

    service = module.get<AccountService>(AccountService);
    httpService = module.get<HttpService>(HttpService);
  };

  beforeEach(async () => {
    await setupTestingModule();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user Accounts', () => {
    it('should return a list of user accounts', async () => {
      const userAccounts = await service.getUserAccounts();

      expect(httpService.get).toHaveBeenCalledWith(`${mockConfigService.getStarHost}/api/v2/accounts`, {
        headers: { Accept: 'application/json', Authorization: 'Bearer mock-access-token' }
      });
      expect(userAccounts).toEqual(ACCOUNT_INFO);
    });
  });
});
