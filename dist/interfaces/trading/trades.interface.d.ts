import { CommonResponseV2 } from '../common/responseV2.interface';
export interface Trades extends CommonResponseV2 {
    trades: Trade[];
}
export interface Trade {
    id: number;
    creationTime: number;
    description: string;
    price: number;
    volume: number;
    side: string;
    fee: number;
    orderId: number;
}
