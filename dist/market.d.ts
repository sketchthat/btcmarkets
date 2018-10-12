import { Active } from './interfaces/market/active.interface';
import { OrderBook } from './interfaces/market/orderbook.interface';
import { Tick } from './interfaces/market/tick.interface';
import { Trades } from './interfaces/market/trades.interface';
import { HistoricTicksTimeType } from './interfaces/market/historicTicks.interface';
export declare class Market {
    private common;
    private apiPrefix;
    constructor();
    active(): Promise<Active>;
    tick(instrument: string, currency: string): Promise<Tick>;
    orderbook(instrument: string, currency: string): Promise<OrderBook>;
    trades(instrument: string, currency: string, indexForward?: boolean, limit?: number, since?: number): Promise<Trades>;
    historicTicks(instrument: string, currency: string, time: HistoricTicksTimeType, limit?: number, since?: number, indexForward?: boolean, sortForward?: boolean): Promise<any>;
}
