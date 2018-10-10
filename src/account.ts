import { Common } from './common';
import { createHmac } from './services/authentication';

import { Balance } from './interfaces/account/balance';
import { TradingFee } from './interfaces/account/tradingFee.interface';

export class Account {
  private common: Common;
  private apiPrefix: string;

  private publicKey: string;
  private privateKey: string;

  constructor(
    publicKey?: string,
    privateKey?: string,
  ) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;

    this.apiPrefix = '/account';

    this.common = new Common();
  }

  public async balance(): Promise<Balance[]> {
    const r = createHmac(`${this.apiPrefix}/balance`, this.publicKey, this.privateKey);

    const balances = await this.common.request('GET', r.path, null, null, r.headers);

    return balances.map(b => this.common.adjustBalance(b, ['balance', 'pendingFunds']));
  }

  public async tradingFees(instrument: string, currency: string): Promise<TradingFee> {
    const r = createHmac(`${this.apiPrefix}/${instrument}/${currency}/tradingfee`, this.publicKey, this.privateKey);

    const tradingFee = await this.common.request('GET', r.path, null, null, r.headers);

    return this.common.adjustBalance(tradingFee, ['tradingFeeRate', 'volume30Day']);
  }
}
