import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@config/customConfig';
import { AccountInfo, SavingAccountInfo } from '@account/entities/account';
import { BalanceInfo } from '@account/entities/balance';
import { TransactionInput } from '@account/dto/transaction.dto';
import { TransactionInfo } from '@account/entities/transaction';
import { TokenManagementService } from '@security/TokenManagementService';
import { TransferSaving } from '@account/dto/transfer.dto';
import { UuidGenerator } from '@config/uuidGenerator';

@Injectable()
export class AccountService {
  private readonly logger: Logger;
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private tokenService: TokenManagementService,
    private readonly uuidGenerator: UuidGenerator
  ) {
    this.logger = new Logger(AccountService.name);
  }

  async getUserAccounts(): Promise<AccountInfo> {
    const accessToken = await this.tokenService.getAccessToken();

    try {
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      };

      this.logger.log('Getting user account');
      const url = `${this.configService.getStarHost}/api/v2/accounts`;
      const response = await lastValueFrom(this.httpService.get<AccountInfo>(url, { headers }));
      return response.data;
    } catch (error) {
      this.logger.error('Failed to retrieve accounts', error);
      throw new HttpException('Failed to retrieve accounts', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAccountBalance(accountUid: string): Promise<BalanceInfo> {
    const accessToken = await this.tokenService.getAccessToken();
    try {
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      };

      this.logger.log('Getting balance');
      const url = `${this.configService.getStarHost}/api/v2/accounts/${accountUid}/balance`;
      const response = await lastValueFrom(this.httpService.get<BalanceInfo>(url, { headers }));
      return response.data;
    } catch (err: unknown) {
      throw new HttpException('Failed to retrieve balance', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransactions({ accountUid, categoryUid, changesSince }: TransactionInput): Promise<TransactionInfo> {
    const accessToken = await this.tokenService.getAccessToken();
    try {
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      };

      this.logger.log('Getting transactions');
      const url = `${this.configService.getStarHost}/api/v2/feed/account/${accountUid}/category/${categoryUid}?changesSince=${changesSince}`;
      const response = await lastValueFrom(this.httpService.get<TransactionInfo>(url, { headers }));
      return response.data;
    } catch (err: unknown) {
      throw new HttpException('Failed to retrieve transactions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSavingsAccount(accountUid: string): Promise<SavingAccountInfo> {
    const accessToken = await this.tokenService.getAccessToken();
    try {
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      };

      this.logger.log('Getting saving accounts');
      const url = `${this.configService.getStarHost}/api/v2/account/${accountUid}/savings-goals`;
      const response = await lastValueFrom(this.httpService.get<SavingAccountInfo>(url, { headers }));
      return response.data;
    } catch (err: unknown) {
      throw new HttpException('Failed to retrieve savings', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async transferToSaving({ accountUid, savingsGoalUid, amount }: TransferSaving): Promise<SavingAccountInfo> {
    const accessToken = await this.tokenService.getAccessToken();
    const transferUid = this.uuidGenerator.generateUUID();
    try {
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      };

      this.logger.log('Transfer to saving account');
      const url = `${this.configService.getStarHost}/api/v2/account/${accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`;

      const response = await lastValueFrom(this.httpService.put<SavingAccountInfo>(url, { amount }, { headers }));
      return response.data;
    } catch (err: unknown) {
      throw new HttpException('Failed to add savings', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
