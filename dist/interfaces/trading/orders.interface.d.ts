export interface Orders {
    success: boolean;
    errorCode: number;
    errorMessage: string;
    orders: Order[];
}
export interface History extends Orders {
    paging?: {
        newer: string;
        older: string;
    };
}
interface Order {
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
export interface Trades {
    success: boolean;
    errorCode: number;
    errorMessage: string;
    trades: Trade[];
}
interface Trade {
    id: number;
    creationTime: number;
    description: string;
    price: number;
    volume: number;
    side: string;
    fee: number;
    orderId: number;
}
export {};
