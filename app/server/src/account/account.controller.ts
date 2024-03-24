import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from '@account/account.service';
import { TransactionInfo } from '@account/entities/transaction';
import { AccountInfo, SavingAccountInfo } from '@account/entities/account';
import { BalanceInfo } from '@account/entities/balance';
import { TransactionInput } from '@account/dto/transaction.dto';
import { TransferSaving } from '@account/dto/transfer.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccounts(): Promise<AccountInfo> {
    return this.accountService.getUserAccounts();
  }

  @Get('/balance/:accountUid')
  getBalance(@Param('accountUid') accountUid: string): Promise<BalanceInfo> {
    return this.accountService.getAccountBalance(accountUid);
  }

  @Post('/transactions')
  getTransaction(@Body() transaction: TransactionInput): Promise<TransactionInfo> {
    return this.accountService.getTransactions(transaction);
  }

  @Put('/add-saving')
  async transferToSaving(@Body() transferData: TransferSaving): Promise<SavingAccountInfo> {
    return await this.accountService.transferToSaving(transferData);
  }
}
