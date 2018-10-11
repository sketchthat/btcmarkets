export interface History {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  orders: HistoryOrder[];
}

interface HistoryOrder {
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
  trades: OrderTrade[];
}

interface OrderTrade {
  id: number;
  creationTime: number;
  description: string;
  price: number;
  volume: number;
  side: string;
  fee: number;
  orderId: number;
}
