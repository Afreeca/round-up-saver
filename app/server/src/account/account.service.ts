import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from 'src/config/customConfig';
import { AccountInfo, SavingAccountInfo } from './entities/account';
import { v4 as uuidv4 } from 'uuid';
import { BalanceInfo } from './entities/balance';
import { TransactionInput } from './dto/transaction.dto';
import { TransactionInfo } from './entities/transaction';
import { TokenManagementService } from 'src/security/TokenManagementService';
import { TransferSaving } from './dto/transfer.dto';

@Injectable()
export class AccountService {
  private readonly logger: Logger;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private tokenService: TokenManagementService
  ) {
    this.logger = new Logger(AccountService.name);
  }

  async getUserAccounts() {
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
    } catch (err: unknown) {
      this.logger.log('Getting user account');
      throw new HttpException('Failed with status code 500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAccountBalance(accountUid: string) {
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
      throw new HttpException('Failed with status code 500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransactions({ accountUid, categoryUid, changesSince }: TransactionInput) {
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
      throw new HttpException('Failed with status code 500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSavingsAccount(accountUid: string) {
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
      throw new HttpException('Failed with status code 500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async transferToSaving({ accountUid, savingsGoalUid, amount }: TransferSaving) {
    const accessToken = await this.tokenService.getAccessToken();
    const transferUid = uuidv4();

    try {
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      };

      const url = `${this.configService.getStarHost}/api/v2/account/${accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`;

      const response = await lastValueFrom(this.httpService.put<SavingAccountInfo>(url, { amount }, { headers }));
      return response.data;
    } catch (err: unknown) {
      throw new HttpException('Failed with status code 500', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
