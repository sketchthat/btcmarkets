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

  public async history(currency: string, instrument: string, limit: number, since?: number): Promise<any> {
    const body = {
      currency: currency.toUpperCase(),
      instrument: instrument.toUpperCase(),
      limit,
      since,
    };

    const r = createHmac('/order/history', this.publicKey, this.privateKey, null, body);

    const history = await this.common.request('POST', r.path, null, body, r.headers);

    history.orders = history.orders.map((o, i) => {
      history.orders[i] = history.orders[i].trades.map(t => this.common.adjustBalance(t, ['price', 'volume', 'fee']));

      return this.common.adjustBalance(o, ['price', 'volume']);
    });

    return history;
  }
}
