import * as crypto from 'crypto';
import * as rp from 'request-promise';

import { IAccountBalance } from './interfaces/accountBalance.interface';
import { IMarketOrderBook } from './interfaces/marketOrderBook.interface';
import { ITradingFee } from './interfaces/tradingFee.interface';

export class BTCMarkets {
  private keys: {
    publicKey: string;
    privateKey: string;
  }
  private nonce: number;
  private base: string;
  private accountFloat: number;


  constructor(publicKey: string, privateKey: string) {
    this.keys = { publicKey, privateKey };
    this.base = 'https://api.btcmarkets.net';
    this.accountFloat = 100000000;
  }

  private async callPrivate(method: string): Promise<any> {
    const uri = `${this.base}${method}`;
    const hmac = this.generateHmac(method);

    try {
      const opts = {
        uri: uri,
        headers: {
          apiKey: this.keys.publicKey,
          timestamp: this.nonce,
          signature: hmac
        },
        json: true
      };

      const resp = await rp.get(opts);

      return resp;
    } catch (err) {
      throw err;
    }
  }

  private async callPublic(method: string): Promise<any> {
    const uri = `${this.base}${method}`;

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

  private generateHmac(method: string): string {
    this.nonce = new Date().valueOf();

    const message = [
      method,
      this.nonce
    ];

    const hash = crypto.createHmac('sha512', new Buffer(this.keys.privateKey, 'base64'))
      .update(message.join("\n") + "\n")
      .digest('base64');

    return hash;
  }

  public async marketOrderBook(coin: string, currency: string): Promise<IMarketOrderBook> {
    const resp: IMarketOrderBook = await this.callPublic(`/market/${coin.toUpperCase()}/${currency.toUpperCase()}/orderbook`);

    return resp;
  }

  public async getTradingFee(instrument: string, currency: string): Promise<ITradingFee> {
    let resp: ITradingFee = await this.callPrivate(`/account/${instrument}/${currency}/tradingfee`);

    if (resp.tradingFeeRate > 0) {
      resp.tradingFeeRate = resp.tradingFeeRate / this.accountFloat;
    }

    if (resp.volume30Day > 0) {
      resp.volume30Day = resp.volume30Day / this.accountFloat;
    }

    return resp;
  }

  public async accountBalance(): Promise<IAccountBalance[]> {
    let resp: IAccountBalance[] = await this.callPrivate('/account/balance');

    resp = resp.map(account => {
      if (account.balance > 0) {
        account.balance = account.balance / this.accountFloat;
      }
      if (account.pendingFunds > 0) {
        account.pendingFunds = account.pendingFunds / this.accountFloat;
      }

      return account;
    });

    return resp;
  }
}
