import { CommonResponseV2 } from '../common/responseV2.interface';

export interface TradingFee extends CommonResponseV2 {
  tradingFeeRate: number;
  volume30Day: number;
}
