import * as querystring from 'querystring';
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

    const response = await rp(opts);

    if (response && response.paging) {
      const newer = this.getPaging(response.paging.newer);
      const older = this.getPaging(response.paging.older);

      response.paging = {
        newer,
        older,
      };
    }

    return response;
  }

  public adjustBalance(item: any, figures: string[]) {
    figures.forEach(figure => {
      if (item[figure] !== 0) {
        item[figure] = this.convertFigure(false, item[figure]);
      }
    });

    return item;
  }

  public convertFigure(sendFigure: boolean, figure: number) {
    return sendFigure ? figure * this.accountFloat : figure / this.accountFloat;
  }

  public convertType(paging: object, adjustment: object): any {
    const adjustTool = ((key, direction) => {
      if (adjustment[key]) {
        const value = paging[direction][key];

        switch (adjustment[key]) {
          case 'number':
            converted[direction][key] = parseInt(value, 10);
            break;
          case 'boolean':
            converted[direction][key] = value === 'true';
            break;
          default:
            converted[direction][key] = value;
            break;
        }
      }
    });

    const converted = {
      newer: {},
      older: {},
    };

    if (paging) {
      Object.keys(paging).forEach(direction => {
        if (paging[direction]) {
          Object.keys(paging[direction]).forEach(key => {
            adjustTool(key, direction);
          });
        }
      });
    }

    return converted;
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

  private getPaging(paging: string): object {
    if (paging && paging.match(/\?/)) {
      const split = paging.split('?');

      const qs = querystring.parse(split[1]);

      return qs;
    }
  }
}
