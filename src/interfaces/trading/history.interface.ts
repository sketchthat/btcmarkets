import { CommonPaging } from '../common/paging.interface';
import { Order } from './orders.interface';

export interface History {
  orders: Order[];
  paging?: CommonPaging;
}
