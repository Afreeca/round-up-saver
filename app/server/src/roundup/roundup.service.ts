import { TransactionInput } from './../account/entities/dto/transaction.dto';
import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { Direction, TransactionInfo } from 'src/account/entities/transaction';
import Decimal from 'decimal.js';

@Injectable()
export class RoundUpService {
  constructor(private readonly accountService: AccountService) {}

  async roundUp(transaction: TransactionInput): Promise<number> {
    // Fetch transactions for a specific week
    const transactions: TransactionInfo =
      await this.accountService.getTransactions(transaction);

    // Filter in only transactions out(payments made)
    const moneyOutTransactions = transactions.feedItems.filter(
      (transaction) => transaction.direction === Direction.OUT,
    );

    // Calculate round-up amount for each transaction and accumulate the savings
    let totalRoundUpAmount = new Decimal(0);
    moneyOutTransactions.map((transaction) => {
      //rounds a number up to the nearest integer.
      const roundedAmount = new Decimal(
        Math.ceil(transaction.amount.minorUnits / 100),
      );
      // subtract the transaction amount from roundedAmout to get the difference we need to save
      const saving = roundedAmount.minus(transaction.amount.minorUnits / 100);
      totalRoundUpAmount = totalRoundUpAmount.plus(saving);
    });

    return totalRoundUpAmount.toNumber(); // Convert Decimal to number
  }
}
