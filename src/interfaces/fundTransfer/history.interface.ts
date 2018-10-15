import { CommonPaging } from '../common/paging.interface';
import { CommonResponseV2 } from '../common/responseV2.interface';

export interface History extends CommonResponseV2 {
  fundTransfers: FundTransfer[];
  paging: CommonPaging;
}

interface FundTransfer {
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
  cryptoPaymentDetail: CryptoPaymentDetail;
}

interface CryptoPaymentDetail {
  address: string;
  txId: string;
}
