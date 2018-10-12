export type CreateOrderSideType = 'Bid' | 'Ask';
export type CreateOrdertypeType = 'Limit' | 'Market';

export interface Create {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  id: number;
  clientRequestId: string;
}
