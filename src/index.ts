import { Account } from './account';
import { Trading } from './trading';
import { Transaction } from './transaction';

export class BTCMarkets {
  private accountClass: Account;
  private tradingClass: Trading;
  private transactionClass: Transaction;

  constructor(
    publicKey?: string,
    privateKey?: string,
  ) {
    this.accountClass = new Account(publicKey, privateKey);
    this.tradingClass = new Trading(publicKey, privateKey);
    this.transactionClass = new Transaction(publicKey, privateKey);
  }

  public account() {
    return this.accountClass;
  }

  public trading() {
    return this.tradingClass;
  }

  public transaction() {
    return this.transactionClass;
  }
}
