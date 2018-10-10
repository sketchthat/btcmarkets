import { Common } from './common';
import { createHmac } from './services/authentication';

import { History } from './interfaces/transaction/history.interface';

export class Transaction {
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

    const apiVersion = '/v2';
    const apiGroup = '/transaction';
    this.apiPrefix = `${apiVersion}${apiGroup}`;

    this.common = new Common();
  }

  public async history(): Promise<History> {
    const r = createHmac(`${this.apiPrefix}/history`, this.publicKey, this.privateKey);

    const response = await this.common.request('GET', r.path, null, null, r.headers);

    response.transactions = response.transactions.map(t => this.common.adjustBalance(t, ['balance', 'amount']));

    return response;
  }
}
