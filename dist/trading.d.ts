import { Cancelled } from './interfaces/trading/cancel.interface';
import { Create, CreateOrderSideType, CreateOrdertypeType } from './interfaces/trading/create.interface';
import { History, Orders, Trades } from './interfaces/trading/orders.interface';
export declare class Trading {
    private common;
    private publicKey;
    private privateKey;
    constructor(publicKey?: string, privateKey?: string);
    create(instrument: string, currency: string, price: number, volume: number, orderSide: CreateOrderSideType, ordertype: CreateOrdertypeType, clientRequestId: string): Promise<Create>;
    cancel(orderIds: number[]): Promise<Cancelled>;
    history(instrument: string, currency: string, indexForward?: boolean, limit?: number, since?: number): Promise<History>;
    open(instrument: string, currency: string): Promise<Orders>;
    detail(orderIds: number[]): Promise<Orders>;
    tradeHistory(instrument: string, currency: string, indexForward?: boolean, limit?: number, since?: number): Promise<Trades>;
    private commonHistoryOpen;
}
