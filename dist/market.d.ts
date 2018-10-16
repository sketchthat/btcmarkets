import { Active } from './interfaces/market/active.interface';
import { HistoricTick, HistoricTicksTimeType } from './interfaces/market/historicTicks.interface';
import { OrderBook } from './interfaces/market/orderbook.interface';
import { Tick } from './interfaces/market/tick.interface';
import { Trades } from './interfaces/market/trades.interface';
export declare class Market {
    private common;
    private apiPrefix;
    constructor();
    active(): Promise<Active>;
    tick(instrument: string, currency: string): Promise<Tick>;
    orderbook(instrument: string, currency: string): Promise<OrderBook>;
    trades(instrument: string, currency: string, limit?: number, since?: number, indexForward?: boolean): Promise<Trades>;
    historicTicks(instrument: string, currency: string, time: HistoricTicksTimeType, limit?: number, since?: number, indexForward?: boolean, sortForward?: boolean): Promise<HistoricTick>;
}
