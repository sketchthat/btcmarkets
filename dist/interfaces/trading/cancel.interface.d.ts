export interface Cancelled {
    success: boolean;
    errorCode: number;
    errorMessage: string;
    responses: Order[];
}
interface Order {
    success: boolean;
    errorCode: number;
    errorMessage: string;
    id: number;
}
export {};
