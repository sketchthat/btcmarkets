export interface IFundTransferHistory {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  fundTransfers: IFundTransfer[];
  paging: {
    newer: string;
    older: string;
  };
}

interface IFundTransfer {
  status: string;
  fundTransferId: number;
  description: string;
  creationTime: number;
  currency: string;
  amount: number;
  fee: number;
  transferType: string;
  errorMessage: string;
  lastUpdate: number;
  cryptoPaymentDetail?: {
    address: string;
    txId: string;
  };
}
