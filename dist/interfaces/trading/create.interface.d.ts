export declare type CreateOrderSideType = 'Bid' | 'Ask';
export declare type CreateOrdertypeType = 'Limit' | 'Market';
export interface Create {
    success: boolean;
    errorCode: number;
    errorMessage: string;
    id: number;
    clientRequestId: string;
}
