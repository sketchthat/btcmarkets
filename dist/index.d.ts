import { Account } from './account';
import { FundTransfer } from './fundTransfer';
import { Market } from './market';
import { Trading } from './trading';
import { Transaction } from './transaction';
export declare class BTCMarkets {
    private accountClass;
    private fundTransferClass;
    private marketClass;
    private tradingClass;
    private transactionClass;
    constructor(publicKey?: string, privateKey?: string);
    account(): Account;
    fundTransfer(): FundTransfer;
    market(): Market;
    trading(): Trading;
    transaction(): Transaction;
}
