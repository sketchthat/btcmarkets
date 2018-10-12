import { CommonResponseV2 } from '../common/responseV2.interface';
import { Trade } from './trades.interface';

export interface Orders extends CommonResponseV2 {
  orders: Order[];
}

export interface Order {
  id: number;
  currency: string;
  orderSide: string;
  ordertype: string;
  creationTime: number;
  status: string;
  errorMessage: string;
  price: number;
  volume: number;
  openVolume: number;
  clientRequestId: number;
  trades: Trade[];
}
