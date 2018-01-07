export interface IMarketOrderBook {
  currency: string;
  instrument: string;
  timestamp: number;
  asks: number[][],
  bids: number[][],
}
