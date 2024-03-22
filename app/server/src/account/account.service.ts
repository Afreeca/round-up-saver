import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from 'src/config/customConfig';
import { AccountInfo } from './entities/account';
import { BalanceInfo } from './entities/balance';
import { TransactionInput } from './entities/dto/transaction.dto';
import { TransactionInfo } from './entities/transaction';

@Injectable()
export class AccountService {
  private readonly logger: Logger;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger(AccountService.name);
  }

  async getUserAccounts({ userName }: { userName: string }) {
    try {
      const headers = {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_21Ty5KjMAz8lSnOoykgDgFuc9sf2A8Qlpy4BmzKNpmd2tp_XxNDCKnc6G49Wpb4m2nvszbDUQPxYD98QNdrc-7QfH1IO2TvmZ-6GFGKqqZKCFBcNCD4lAMWTQVlVQrRCMqpoBjMf8asLU5FURyOZSneM40hEbmo65lAKe1kwi_bE7vfmpbasilqUKeqBFHSAepTUUFzoAOr_EQ1d7F2sF9stgwlmyPURckgGs6h7sojyFwcq7I7slCHmBHH-pSSvd-ymI8dUK0UiKo5QVMQQZl3ShYH5DjLPLC0I8-PkpzC5WYVDA7cOkZ6exLCz_gkaGITtNLs9nyvfdgxCyBy0WTLpMMdJCUElJeB75Eb_nY68BtO4WKd9nFloA3pq6YJ-xTcYY9GLtYkOgJpTXC2T41mZtGsUdoNGLQ1YBWoydBiQE4-2GGdgwfUS_aAhjBwS9xz9LHCW9jAASPCVkY4iyu-ZY74w7xKCSxFEtiCQA94XmombfuE4NB4lLPnOw29lXH6rXYiwM7P8MwuWc4q3a-tUu8ddYtyLFmPYQf8Xkr78HiNq_BwtpuPHbeMuuNudR6ZNJyKz_6ixCa-qLWJqai8ME09E8SxtzPyHEIccBoXOOJ6JvH_j1cUj8k6emi_Z9e-e_ZFPthvc-cDzwZA-uszNZJK1ONOb6t4XnL27z_y3_LMsgQAAA.uM5q2HpEWJ8XV18Po8LyaJUZU7fhXEzKfRiY2pM2AX4_EcbX3N9TVtWqgG979PCnI3F7bjUz_IsnxvCet5UOypc8TqAmSRpHdFautxv6r4dI82hqFJxOnx9yiWb0RM2NpbtFuIs1bSeGuRli8yKAkjiiOXAJe4o3quaNCIz8LiYABBlhjYw5whwAVIpDg5Q3ntl0b82PTFv753FXT1hBEWxpJwDigie1PAt2cb_Yb2GK2WkEiV1vqQl5c3It_xBgf9SlH7DaHRAIXglAapGYAFWsbcmq4HKa3Ty3hTl5FJqJP_LS3orcCuA8GQTLs3ZH4Up91Hjnu4IEaCDTH-oUwC8PlPPlx8V7ZLjOdqYWr-SH3_oieKa3XxKzA2M7UkPOMDBaKhWhib53ccNPJ1Ju1H2iBk6W-ilyBR3KFgMfFQGtxfpKRze-ItzplUwDuzN0PyArUP1nwhZP23zBi-zmIjMBNP6Sg3Z6Cncj2O0wYK8SYewbtvGpVuLivzbxIvHqaqjlbMS_GQ0jceqtV8ZG1cQZTATEDyrd_USV2-8vNtpSVb9K4JdKDHrILDCCl-ddzHPF1bFOSSfOhMXSUSqoczoOWJIt7oBqGWedyC4Jdqm_8xuF4u8jpFhKhOQFnvFKJ7KbuGQLLz6E1w_WR647qeY6jU7zZXFUV6eWO4hIFF8',
        'User-Agent': 'Adilson Mendes',
      };

      this.logger.log('Getting user account');
      const url = `${this.configService.getStarHost}/api/v2/accounts`;
      const response = await lastValueFrom(
        this.httpService.get<AccountInfo>(url, { headers }),
      );
      return response.data;
    } catch (err: unknown) {
      this.logger.log('Getting user account');
      throw new InternalServerErrorException(err);
    }
  }

  async getAccountBalance(accountUid: string) {
    try {
      const headers = {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_21Ty5KjMAz8lSnOoykgDgFuc9sf2A8Qlpy4BmzKNpmd2tp_XxNDCKnc6G49Wpb4m2nvszbDUQPxYD98QNdrc-7QfH1IO2TvmZ-6GFGKqqZKCFBcNCD4lAMWTQVlVQrRCMqpoBjMf8asLU5FURyOZSneM40hEbmo65lAKe1kwi_bE7vfmpbasilqUKeqBFHSAepTUUFzoAOr_EQ1d7F2sF9stgwlmyPURckgGs6h7sojyFwcq7I7slCHmBHH-pSSvd-ymI8dUK0UiKo5QVMQQZl3ShYH5DjLPLC0I8-PkpzC5WYVDA7cOkZ6exLCz_gkaGITtNLs9nyvfdgxCyBy0WTLpMMdJCUElJeB75Eb_nY68BtO4WKd9nFloA3pq6YJ-xTcYY9GLtYkOgJpTXC2T41mZtGsUdoNGLQ1YBWoydBiQE4-2GGdgwfUS_aAhjBwS9xz9LHCW9jAASPCVkY4iyu-ZY74w7xKCSxFEtiCQA94XmombfuE4NB4lLPnOw29lXH6rXYiwM7P8MwuWc4q3a-tUu8ddYtyLFmPYQf8Xkr78HiNq_BwtpuPHbeMuuNudR6ZNJyKz_6ixCa-qLWJqai8ME09E8SxtzPyHEIccBoXOOJ6JvH_j1cUj8k6emi_Z9e-e_ZFPthvc-cDzwZA-uszNZJK1ONOb6t4XnL27z_y3_LMsgQAAA.uM5q2HpEWJ8XV18Po8LyaJUZU7fhXEzKfRiY2pM2AX4_EcbX3N9TVtWqgG979PCnI3F7bjUz_IsnxvCet5UOypc8TqAmSRpHdFautxv6r4dI82hqFJxOnx9yiWb0RM2NpbtFuIs1bSeGuRli8yKAkjiiOXAJe4o3quaNCIz8LiYABBlhjYw5whwAVIpDg5Q3ntl0b82PTFv753FXT1hBEWxpJwDigie1PAt2cb_Yb2GK2WkEiV1vqQl5c3It_xBgf9SlH7DaHRAIXglAapGYAFWsbcmq4HKa3Ty3hTl5FJqJP_LS3orcCuA8GQTLs3ZH4Up91Hjnu4IEaCDTH-oUwC8PlPPlx8V7ZLjOdqYWr-SH3_oieKa3XxKzA2M7UkPOMDBaKhWhib53ccNPJ1Ju1H2iBk6W-ilyBR3KFgMfFQGtxfpKRze-ItzplUwDuzN0PyArUP1nwhZP23zBi-zmIjMBNP6Sg3Z6Cncj2O0wYK8SYewbtvGpVuLivzbxIvHqaqjlbMS_GQ0jceqtV8ZG1cQZTATEDyrd_USV2-8vNtpSVb9K4JdKDHrILDCCl-ddzHPF1bFOSSfOhMXSUSqoczoOWJIt7oBqGWedyC4Jdqm_8xuF4u8jpFhKhOQFnvFKJ7KbuGQLLz6E1w_WR647qeY6jU7zZXFUV6eWO4hIFF8',
        'User-Agent': 'Adilson Mendes',
      };

      this.logger.log('Getting balance');
      const url = `${this.configService.getStarHost}/api/v2/accounts/${accountUid}/balance`;
      const response = await lastValueFrom(
        this.httpService.get<BalanceInfo>(url, { headers }),
      );
      return response.data;
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }

  async getTransactions({
    accountUid,
    categoryUid,
    changesSince,
  }: TransactionInput) {
    try {
      const headers = {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_21Ty5KjMAz8lSnOoykgDgFuc9sf2A8Qlpy4BmzKNpmd2tp_XxNDCKnc6G49Wpb4m2nvszbDUQPxYD98QNdrc-7QfH1IO2TvmZ-6GFGKqqZKCFBcNCD4lAMWTQVlVQrRCMqpoBjMf8asLU5FURyOZSneM40hEbmo65lAKe1kwi_bE7vfmpbasilqUKeqBFHSAepTUUFzoAOr_EQ1d7F2sF9stgwlmyPURckgGs6h7sojyFwcq7I7slCHmBHH-pSSvd-ymI8dUK0UiKo5QVMQQZl3ShYH5DjLPLC0I8-PkpzC5WYVDA7cOkZ6exLCz_gkaGITtNLs9nyvfdgxCyBy0WTLpMMdJCUElJeB75Eb_nY68BtO4WKd9nFloA3pq6YJ-xTcYY9GLtYkOgJpTXC2T41mZtGsUdoNGLQ1YBWoydBiQE4-2GGdgwfUS_aAhjBwS9xz9LHCW9jAASPCVkY4iyu-ZY74w7xKCSxFEtiCQA94XmombfuE4NB4lLPnOw29lXH6rXYiwM7P8MwuWc4q3a-tUu8ddYtyLFmPYQf8Xkr78HiNq_BwtpuPHbeMuuNudR6ZNJyKz_6ixCa-qLWJqai8ME09E8SxtzPyHEIccBoXOOJ6JvH_j1cUj8k6emi_Z9e-e_ZFPthvc-cDzwZA-uszNZJK1ONOb6t4XnL27z_y3_LMsgQAAA.uM5q2HpEWJ8XV18Po8LyaJUZU7fhXEzKfRiY2pM2AX4_EcbX3N9TVtWqgG979PCnI3F7bjUz_IsnxvCet5UOypc8TqAmSRpHdFautxv6r4dI82hqFJxOnx9yiWb0RM2NpbtFuIs1bSeGuRli8yKAkjiiOXAJe4o3quaNCIz8LiYABBlhjYw5whwAVIpDg5Q3ntl0b82PTFv753FXT1hBEWxpJwDigie1PAt2cb_Yb2GK2WkEiV1vqQl5c3It_xBgf9SlH7DaHRAIXglAapGYAFWsbcmq4HKa3Ty3hTl5FJqJP_LS3orcCuA8GQTLs3ZH4Up91Hjnu4IEaCDTH-oUwC8PlPPlx8V7ZLjOdqYWr-SH3_oieKa3XxKzA2M7UkPOMDBaKhWhib53ccNPJ1Ju1H2iBk6W-ilyBR3KFgMfFQGtxfpKRze-ItzplUwDuzN0PyArUP1nwhZP23zBi-zmIjMBNP6Sg3Z6Cncj2O0wYK8SYewbtvGpVuLivzbxIvHqaqjlbMS_GQ0jceqtV8ZG1cQZTATEDyrd_USV2-8vNtpSVb9K4JdKDHrILDCCl-ddzHPF1bFOSSfOhMXSUSqoczoOWJIt7oBqGWedyC4Jdqm_8xuF4u8jpFhKhOQFnvFKJ7KbuGQLLz6E1w_WR647qeY6jU7zZXFUV6eWO4hIFF8',
        'User-Agent': 'Adilson Mendes',
      };

      this.logger.log('Getting transactions');
      const url = `${this.configService.getStarHost}/api/v2/feed/account/${accountUid}/category/${categoryUid}?changesSince=${changesSince}`;
      const response = await lastValueFrom(
        this.httpService.get<TransactionInfo>(url, { headers }),
      );
      return response.data;
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }
}
