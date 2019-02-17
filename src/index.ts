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

  public account(): Account {
    return this.accountClass;
  }

  public fundTransfer(): FundTransfer {
    return this.fundTransferClass;
  }

  public market(): Market {
    return this.marketClass;
  }

  public trading(): Trading {
    return this.tradingClass;
  }

  public transaction(): Transaction {
    return this.transactionClass;
  }

  public getFloat(): number {
    return this.commonClass.accountFloat;
  }
}
