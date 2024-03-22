import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { TransactionInput } from './entities/dto/transaction.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly acccountService: AccountService) {}

  @Get()
  getAccounts(): any {
    return this.acccountService.getUserAccounts({ userName: 'Adilson Mendes' });
  }

  @Get('/balance/:accountUid')
  getBalance(@Param('accountUid') accountUid: string): any {
    return this.acccountService.getAccountBalance(accountUid);
  }

  @Post('/transactions')
  getTransaction(@Body() transaction: TransactionInput): any {
    return this.acccountService.getTransactions(transaction);
  }
}
