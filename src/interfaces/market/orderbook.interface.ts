export interface OrderBook {
  instrument: string;
  currency: string;
  timestamp: number;
  asks: number[][];
  bids: number[][];
}
