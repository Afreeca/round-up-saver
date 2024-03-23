import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { TransactionInfo } from './entities/transaction';
import { AccountInfo } from './entities/account';
import { BalanceInfo } from './entities/balance';
import { TransactionInput } from './dto/transaction.dto';
import { TransferSaving } from './dto/transfer.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly acccountService: AccountService) {}

  @Get()
  getAccounts(): Promise<AccountInfo> {
    return this.acccountService.getUserAccounts();
  }

  @Get('/balance/:accountUid')
  getBalance(@Param('accountUid') accountUid: string): Promise<BalanceInfo> {
    return this.acccountService.getAccountBalance(accountUid);
  }

  @Post('/transactions')
  getTransaction(@Body() transaction: TransactionInput): Promise<TransactionInfo> {
    return this.acccountService.getTransactions(transaction);
  }

  @Put('/add-saving')
  async transferToSaving(@Body() transferData: TransferSaving) {
    return this.acccountService.transferToSaving(transferData);
  }
}
