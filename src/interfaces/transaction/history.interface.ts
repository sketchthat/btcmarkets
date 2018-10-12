export interface History {
  success: boolean;
  paging: {
    newer: string;
    older: string;
  };
  transactions: {
    id: number;
    creationTime: number;
    description: string;
    currency: string;
    balance: number;
    amount: number;
    recordType: string;
    referenceId: number;
    action: string;
  }[];
}
