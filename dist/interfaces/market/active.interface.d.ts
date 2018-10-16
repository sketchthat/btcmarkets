import { CommonResponseV2 } from '../common/responseV2.interface';
export interface Active extends CommonResponseV2 {
    markets: Market[];
}
interface Market {
    instrument: string;
    currency: string;
}
export {};
