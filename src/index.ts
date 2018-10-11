import { Account } from './account';
import { FundTransfer } from './fundTransfer';
import { Trading } from './trading';
import { Transaction } from './transaction';

export class BTCMarkets {
  private accountClass: Account;
  private tradingClass: Trading;
  private transactionClass: Transaction;
  private fundTransferClass: FundTransfer;

  constructor(
    publicKey?: string,
    privateKey?: string,
  ) {
    this.accountClass = new Account(publicKey, privateKey);
    this.fundTransferClass = new FundTransfer(publicKey, privateKey);
    this.tradingClass = new Trading(publicKey, privateKey);
    this.transactionClass = new Transaction(publicKey, privateKey);
  }

  public account() {
    return this.accountClass;
  }

  public fundTransfer() {
    return this.fundTransferClass;
  }

  public trading() {
    return this.tradingClass;
  }

  public transaction() {
    return this.transactionClass;
  }
}
