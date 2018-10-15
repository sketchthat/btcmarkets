import { Order } from './orders.interface';

export interface History {
  orders: Order[];
  paging?: {
    newer: HistoryPaging;
    older: HistoryPaging;
  };
}

interface HistoryPaging {
  since: number;
  indexForward: boolean;
  limit: number;
}
