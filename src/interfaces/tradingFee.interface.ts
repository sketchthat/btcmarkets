export interface ITradingFee {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  tradingFeeRate: number;
  volume30Day: number;
}
