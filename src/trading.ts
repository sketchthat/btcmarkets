import { Common } from './common';
import { createHmac } from './services/authentication';

import { Cancelled } from './interfaces/trading/cancel.interface';
import { Create, CreateOrderSideType, CreateOrdertypeType } from './interfaces/trading/create.interface';
import { History } from './interfaces/trading/history.interface';
import { Orders } from './interfaces/trading/orders.interface';
import { Trades } from './interfaces/trading/trades.interface';

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

  public async create(
    instrument: string,
    currency: string,
    price: number,
    volume: number,
    orderSide: CreateOrderSideType,
    ordertype: CreateOrdertypeType,
    clientRequestId: string,
  ): Promise<Create> {
    const body = {
      instrument: instrument.toUpperCase(),
      currency: currency.toUpperCase(),
      price: this.common.convertFigure(true, price),
      volume: this.common.convertFigure(true, volume),
      orderSide,
      ordertype,
      clientRequestId,
    };

    const r = createHmac('/order/create', this.publicKey, this.privateKey, null, body);

    return this.common.request('POST', r.path, null, body, r.headers);
  }

  public async cancel(orderIds: number[]): Promise<Cancelled> {
    const body = {
      orderIds,
    };

    const r = createHmac('/order/cancel', this.publicKey, this.privateKey, null, body);

    return this.common.request('POST', r.path, null, body, r.headers);
  }

  public async history(instrument: string, currency: string, limit?: number, since?: number, indexForward?: boolean): Promise<History> {
    const qs = {
      indexForward,
      limit,
      since,
    };

    return this.commonHistoryOpen('history', instrument, currency, qs);
  }

  public async open(instrument: string, currency: string): Promise<Orders> {
    return this.commonHistoryOpen('open', instrument, currency) as Promise<Orders>;
  }

  public async detail(orderIds: number[]): Promise<Orders> {
    const body = {
      orderIds,
    };

    const r = createHmac('detail', this.publicKey, this.privateKey, null, body);

    return this.common.request('POST', r.path, null, body, r.headers);
  }

  public async tradeHistory(
    instrument: string,
    currency: string,
    limit?: number,
    since?: number,
    indexForward?: boolean,
  ): Promise<Trades> {
    const qs = {
      indexForward,
      limit,
      since,
    };

    const path = `/v2/order/trade/history/${instrument.toUpperCase()}/${currency.toUpperCase()}`;

    const r = createHmac(path, this.publicKey, this.privateKey, qs, null);

    const response = await this.common.request('GET', r.path, qs, null, r.headers);

    response.trades = response.trades.map(o => this.common.adjustBalance(o, ['price', 'volume', 'fee']));

    return response;
  }

  private async commonHistoryOpen(
    path: string,
    instrument: string,
    currency: string,
    qs?: object,
  ): Promise<Orders|History> {
    let requestPath = '/v2/order';

    if (instrument && currency) {
      requestPath = `${requestPath}/${path}/${instrument.toUpperCase()}/${currency.toUpperCase()}`;
    }

    const r = createHmac(requestPath, this.publicKey, this.privateKey, qs, null);

    const response = await this.common.request('GET', r.path, qs, null, r.headers);

    const adjustment = path.match(/trade/) ? 'trades' : 'orders';

    response[adjustment] = response[adjustment].map((o, i) => {
      response[adjustment][i] = response[adjustment][i].trades.map(t => {
        return this.common.adjustBalance(t, ['price', 'volume', 'fee']);
      });

      return this.common.adjustBalance(o, ['price', 'volume', 'openVolume']);
    });

    return response;
  }
}
