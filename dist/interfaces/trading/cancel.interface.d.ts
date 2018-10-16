import { CommonResponseV2 } from '../common/responseV2.interface';
export interface Cancelled extends CommonResponseV2 {
    responses: Order[];
}
interface Order extends CommonResponseV2 {
    id: number;
}
export {};
