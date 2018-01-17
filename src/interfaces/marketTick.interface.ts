export interface IMarketTick {
  bestBid: number;
  bestAsk: number;
  lastPrice: number;
  currency: string;
  instrument: string;
  timestamp: number;
  volume24h: number;
}
