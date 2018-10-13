import { Common } from './common';
import { createHmac } from './services/authentication';

import { Withdraw } from './interfaces/fundTransfer/withdraw.interface';

export class FundTransfer {
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

    this.apiPrefix = '/fundtransfer';

    this.common = new Common();
  }

  public async withdrawCrypto(amount: number, address: string, currency: string): Promise<Withdraw> {
    const body = {
      amount,
      address,
      currency: currency.toUpperCase(),
    };

    body.amount = this.common.convertFigure(true, body.amount);

    const r = createHmac(`${this.apiPrefix}/withdrawcrypto`, this.publicKey, this.privateKey, null, body);

    return this.common.request('POST', r.path, null, body, r.headers);
  }

  public async withdrawETF(
    accountName: string,
    bankName: string,
    bsbNumber: string,
    accountNumber: string,
    currency: string,
    amount: number,
  ): Promise<Withdraw> {
    const body = {
      accountName,
      accountNumber,
      bankName,
      bsbNumber,
      amount,
      currency: currency.toUpperCase(),
    };

    body.amount = this.common.convertFigure(true, body.amount);

    const r = createHmac(`${this.apiPrefix}/withdraweft`, this.publicKey, this.privateKey, null, body);

    return this.common.request('POST', r.path, null, body, r.headers);
  }

  public async history(limit?: number, since?: number, indexForward?: boolean): Promise<any> {
    const qs = {
      limit: limit ? (limit > 200 ? 200 : limit) : null,
      since,
      indexForward,
    };

    const r = createHmac(`${this.apiPrefix}/history`, this.publicKey, this.privateKey, qs);

    return this.common.request('GET', r.path, qs, null, r.headers);
  }
}
