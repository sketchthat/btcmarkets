export interface Trades {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  trades: Trade[];
  paging: {
    newer: string;
    older: string;
  };
}

interface Trade {
  id: number;
  price: number;
  volume: number;
  creationTime: number;
}
