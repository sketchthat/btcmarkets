import { CommonPaging } from '../common/paging.interface';

export interface History {
  success: boolean;
  paging: CommonPaging;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  creationTime: number;
  description: string;
  currency: string;
  balance: number;
  amount: number;
  recordType: string;
  referenceId: number;
  action: string;
}
