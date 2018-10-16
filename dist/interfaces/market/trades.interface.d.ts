import { CommonResponseV2 } from '../common/responseV2.interface';
export interface Trades extends CommonResponseV2 {
    trades: Trade[];
    paging: {
        newer: TradesPaging;
        older: TradesPaging;
    };
}
interface Trade {
    id: number;
    price: number;
    volume: number;
    creationTime: number;
}
interface TradesPaging {
    since: number;
    indexForward: boolean;
    limit?: number;
}
export {};
