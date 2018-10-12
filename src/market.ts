import { Common } from './common';

import { Active } from './interfaces/market/active.interface';
import { HistoricTicksTimeType } from './interfaces/market/historicTicks.interface';
import { OrderBook } from './interfaces/market/orderbook.interface';
import { Tick } from './interfaces/market/tick.interface';
import { Trades } from './interfaces/market/trades.interface';

export class Market {
  private common: Common;
  private apiPrefix: string;

  constructor() {
    this.common = new Common();

    this.apiPrefix = '/market';
  }

  public async active(): Promise<Active> {
    return this.common.request('GET', `/v2${this.apiPrefix}/active`);
  }

  public async tick(instrument: string, currency: string): Promise<Tick> {
    return this.common.request('GET', `${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/tick`);
  }

  public async orderbook(instrument: string, currency: string): Promise<OrderBook> {
    return this.common.request('GET', `${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/orderbook`);
  }

  public async trades(instrument: string, currency: string, limit?: number, since?: number, indexForward?: boolean): Promise<Trades> {
    const qs = {
      indexForward,
      limit,
      since,
    };

    const response = await this.common.request(
      'GET',
      `/v2${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/trades`,
      qs,
    );

    response.trades = response.trades.map(o => this.common.adjustBalance(o, ['price', 'volume']));

    return response;
  }

  public async historicTicks(
    instrument: string,
    currency: string,
    time: HistoricTicksTimeType,
    limit?: number,
    since?: number,
    indexForward?: boolean,
    sortForward?: boolean,
  ): Promise<any> {
    const qs = {
      limit,
      since,
      indexForward,
      sortForward,
    };

    const response = await this.common.request(
      'GET',
      `/v2${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/tickByTime/${time}`,
      qs,
    );

    response.ticks = response.ticks.map(t => this.common.adjustBalance(t, ['open', 'high', 'low', 'close', 'volume']));

    return response;
  }
}
