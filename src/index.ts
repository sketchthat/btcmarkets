import * as rp from 'request-promise';

import { IMarketOrderBook } from './interfaces/marketOrderBook.interface';

export class BTCMarkets {
  private base: string;

  constructor() {
    this.base = 'https://api.btcmarkets.net';
  }

  private async callPublic(method: string): Promise<any> {
    const uri = `${this.base}/${method}`;

    try {
      const opts = {
        uri: uri,
        json: true,
      };

      const resp = await rp.get(opts);

      return resp;
    } catch (err) {
      throw err;
    }
  }

  public async marketOrderBook(coin: string, currency: string): Promise<IMarketOrderBook> {
    const resp: IMarketOrderBook = await this.callPublic(`market/${coin.toUpperCase()}/${currency.toUpperCase()}/orderbook`);

    return resp;
  }
}
