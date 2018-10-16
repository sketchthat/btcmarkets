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

  public async history(currency?: string, since?: number, indexForward?: boolean, sortForward?: boolean): Promise<History> {
    let path = `${this.apiPrefix}/history`;

    if (currency) {
      path = `${path}/${currency.toUpperCase()}`;
    }

    const qs = {
      since,
      indexForward,
      sortForward,
    };

    const r = createHmac(path, this.publicKey, this.privateKey, qs, null, true);

    const response = await this.common.request('GET', r.path, qs, null, r.headers);

    response.transactions = response.transactions.map(t => this.common.adjustBalance(t, ['balance', 'amount']));

    if (response.paging) {
      const adjustment = {
        since: 'number',
        indexForward: 'boolean',
        sortForward: 'boolean',
      };

      response.paging = this.common.convertType(response.paging, adjustment);
    }

    return response;
  }
}
