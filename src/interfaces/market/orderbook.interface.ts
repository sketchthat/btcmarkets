export interface OrderBook {
  currency: string;
  instrument: string;
  timestamp: number;
  asks: number[][];
  bids: number[][];
}
