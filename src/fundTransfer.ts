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

    const r = createHmac(`${this.apiPrefix}/withdrawCrypto`, this.publicKey, this.privateKey, null, body);

    return this.common.request('POST', r.path, null, body, r.headers);
  }

  public async withdrawETF(
    accountName: string,
    accountNumber: string,
    bankName: string,
    bsbNumber: string,
    amount: number,
    currency: string,
  ): Promise<Withdraw> {
    const body = {
      accountName,
      accountNumber,
      bankName,
      bsbNumber,
      amount,
      currency: currency.toUpperCase(),
    };

    const r = createHmac(`${this.apiPrefix}/withdrawEFT`, this.publicKey, this.privateKey, null, body);

    return this.common.request('POST', r.path, null, body, r.headers);
  }

  public history(limit?: number, since?: number, indexForward?: boolean) {
    const qs = {
      limit: limit ? (limit > 200 ? 200 : limit) : null,
      since,
      indexForward,
    };

    const r = createHmac(`${this.apiPrefix}/history`, this.publicKey, this.privateKey, qs);

    return this.common.request('GET', r.path, qs, null, r.headers);
  }
}
