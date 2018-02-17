import * as crypto from 'crypto';
import * as rp from 'request-promise';

import { IAccountBalance } from './interfaces/accountBalance.interface';
// import { IFundTraasdfansferHistory } from './interfaces/fundTransferHistory.interface';
import { IMarketOrderBook } from './interfaces/marketOrderBook.interface';
import { IMarketTick } from './interfaces/marketTick.interface';
import { IMarketTrade } from './interfaces/marketTrades.interface';
import { ITradingFee } from './interfaces/tradingFee.interface';

import { IPrivateRequest } from './interfaces/general/privateRequest.interface';

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

  private async callPrivate(method: string, qs?: string): Promise<any> {
    const uri = `${this.base}${method}`;
    const hmac = this.generateHmac(method);

    try {
      const opts: IPrivateRequest = {
        uri: uri,
        headers: {
          apiKey: this.keys.publicKey,
          timestamp: this.nonce,
          signature: hmac
        },
        json: true,
      };

      if (qs) {
        opts.qs = qs;
      }

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

  public async marketTick(coin: string, currency: string): Promise<IMarketTick> {
    const resp: IMarketTick = await this.callPublic(`/market/${coin.toUpperCase()}/${currency.toUpperCase()}/tick`);

    return resp;
  }

  public async marketTrades(coin: string, currency: string): Promise<IMarketTrade[]> {
    const resp: IMarketTrade[] = await this.callPublic(`/market/${coin.toUpperCase()}/${currency.toUpperCase()}/trades`);

    return resp;
  }

  public async tradingFee(instrument: string, currency: string): Promise<ITradingFee> {
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

  /*
  private fundTransferPaging: {
    newer: string;
    older: string;
  }

  public async fundTransferHistory(newer?: boolean, older?: boolean): Promise<IFundTransferHistory> {
    let qs = null;

    if ((newer || older) && (this.fundTransferPaging.newer && this.fundTransferPaging.older)) {
      let queryAddress;

      if (newer) {
        queryAddress = this.fundTransferPaging.newer;
      } else if (older) {
        queryAddress = this.fundTransferPaging.older;
      }

      if (queryAddress) {
        const querySplit: string[] = queryAddress.split(/\?|&|=/);

        if (querySplit && querySplit.length > 0) {
          let o;
          qs = {};

          querySplit.forEach((query, i) => {
            if (i > 0) {
              if (i % 2) {
                o = query;
              } else {
                qs[o] = query;
              }
            }
          });
        }
      }
    }

    const resp: IFundTransferHistory = await this.callPrivate(`/fundtransfer/history`, qs);

    this.fundTransferPaging = resp.paging;

    return resp;
  }
  */
}
