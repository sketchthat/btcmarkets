import { CommonResponseV2 } from '../common/responseV2.interface';
export interface Create extends CommonResponseV2 {
    id: number;
    clientRequestId: string;
}
export declare type CreateOrderSideType = 'Bid' | 'Ask';
export declare type CreateOrdertypeType = 'Limit' | 'Market' | 'Stop Limit';
