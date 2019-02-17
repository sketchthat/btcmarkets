import { Account } from './account';
import { Common } from './common';
import { FundTransfer } from './fundTransfer';
import { Market } from './market';
import { Trading } from './trading';
import { Transaction } from './transaction';

export class BTCMarkets {
  private accountClass: Account;
  private fundTransferClass: FundTransfer;
  private marketClass: Market;
  private tradingClass: Trading;
  private transactionClass: Transaction;
  private commonClass: Common;

  constructor(
    publicKey?: string,
    privateKey?: string,
  ) {
    this.accountClass = new Account(publicKey, privateKey);
    this.fundTransferClass = new FundTransfer(publicKey, privateKey);
    this.marketClass = new Market();
    this.tradingClass = new Trading(publicKey, privateKey);
    this.transactionClass = new Transaction(publicKey, privateKey);
    this.commonClass = new Common();
  }

  public account() {
    return this.accountClass;
  }

  public fundTransfer() {
    return this.fundTransferClass;
  }

  public market() {
    return this.marketClass;
  }

  public trading() {
    return this.tradingClass;
  }

  public transaction() {
    return this.transactionClass;
  }

  public getFloat() {
    return this.commonClass.accountFloat;
  }
}
