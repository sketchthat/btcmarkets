export interface History {
  success: boolean;
  paging: {
    newer: HistoryPaging;
    older: HistoryPaging;
  };
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

interface HistoryPaging {
  since: number;
  indexForward: boolean;
  sortForward: boolean;
}
