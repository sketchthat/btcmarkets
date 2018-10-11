import * as rp from 'request-promise';
import { HmacHeaders } from './interfaces/hmacResponse.interface';

export class Common {
  private accountFloat: number;
  private uri: string;

  constructor() {
    const domain = 'api.btcmarkets.net';
    this.uri = `https://${domain}`;
    this.accountFloat = 100000000;
  }

  public async request(method: string, path: string, qs?: object, body?: object, headers?: HmacHeaders): Promise<any> {
    const opts = {
      uri: `${this.uri}${path}`,
      json: true,
      body: this.buildParams(body),
      headers,
      method,
      qs: this.buildParams(qs),
    };

    return rp(opts);
  }

  public adjustBalance(item: any, figures: string[]) {
    figures.forEach(figure => {
      if (item[figure] > 0) {
        item[figure] = item[figure] / this.accountFloat;
      }
    });

    return item;
  }

  private buildParams(params: any): any {
    const returnParams = {};
    let length = 0;

    if (params) {
      Object.keys(params)
        .forEach(key => {
          if (params[key]) {
            returnParams[key] = params[key];
            length++;
          }
        });
    }

    return length > 0 ? returnParams : null;
  }
}
