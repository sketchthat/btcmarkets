import { Common } from './common';
import { createHmac } from './services/authentication';

export class Trading {
  private common: Common;

  private publicKey: string;
  private privateKey: string;

  constructor(
    publicKey?: string,
    privateKey?: string,
  ) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;

    this.common = new Common();
  }

  public create() {
    //
  }

  public cancel() {
    // {'orderIds':[6840125478]}
  }

  public history(currency: string, instrument: string, limit?: number, since?: number): Promise<any> {
    const body = {
      currency: currency.toUpperCase(),
      instrument: instrument.toUpperCase(),
      limit,
      since,
    };

    const r = createHmac('/order/history', this.publicKey, this.privateKey);

    return this.common.request('POST', r.path, null, body, r.headers);
  }
}
