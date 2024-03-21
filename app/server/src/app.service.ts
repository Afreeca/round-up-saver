import axios from 'axios';
import { ConfigService } from './config/customConfig';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

const bankAccounts = [
  {
    accountHolder: 'John Doe',
    accountNumber: '123456789',
    bankName: 'Example Bank',
    balance: 5000,
  },
  {
    accountHolder: 'Jane Smith',
    accountNumber: '987654321',
    bankName: 'Another Bank',
    balance: 7500,
  },
];

@Injectable()
export class AppService {
  private readonly logger: Logger;

  constructor(private configService: ConfigService) {
    this.logger = new Logger(AppService.name);
  }

  async getUserAccounts() {
    return bankAccounts;
  }
}
