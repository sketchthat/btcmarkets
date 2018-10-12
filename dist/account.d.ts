import { Balance } from './interfaces/account/balance';
import { TradingFee } from './interfaces/account/tradingFee.interface';
export declare class Account {
    private common;
    private apiPrefix;
    private publicKey;
    private privateKey;
    constructor(publicKey?: string, privateKey?: string);
    balance(): Promise<Balance[]>;
    tradingFees(instrument: string, currency: string): Promise<TradingFee>;
}
