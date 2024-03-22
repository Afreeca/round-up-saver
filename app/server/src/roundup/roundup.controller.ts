import { Body, Controller, Post } from '@nestjs/common';
import { RoundUpService } from './roundup.service';
import { TransactionInput } from 'src/account/entities/dto/transaction.dto';

@Controller('round-up')
export class RoundUpController {
  constructor(private readonly roundUpService: RoundUpService) {}

  @Post()
  async roundUpTransactions(@Body() transaction: TransactionInput) {
    return this.roundUpService.roundUp(transaction);
  }
}
