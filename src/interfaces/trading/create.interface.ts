import { CommonResponseV2 } from '../common/responseV2.interface';

export interface Create extends CommonResponseV2 {
  id: number;
  clientRequestId: string;
}

export type CreateOrderSideType = 'Bid' | 'Ask';
export type CreateOrdertypeType = 'Limit' | 'Market' | 'Stop Limit';
