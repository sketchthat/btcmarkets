import { CommonResponseV2 } from '../common/responseV2.interface';
export declare type HistoricTicksTimeType = 'minute' | 'hour' | 'day';
export interface HistoricTick extends CommonResponseV2 {
    ticks: Tick[];
}
interface Tick {
    timestamp: number;
    open: number;
    high: number;
    close: number;
    volume: number;
}
export {};
