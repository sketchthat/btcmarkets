export interface Active {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  markets: Market[];
}

interface Market {
  instrument: string;
  currency: string;
}
