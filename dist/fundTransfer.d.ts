import { History } from './interfaces/fundTransfer/history.interface';
import { Withdraw } from './interfaces/fundTransfer/withdraw.interface';
export declare class FundTransfer {
    private common;
    private apiPrefix;
    private publicKey;
    private privateKey;
    constructor(publicKey?: string, privateKey?: string);
    withdrawCrypto(amount: number, address: string, currency: string): Promise<Withdraw>;
    withdrawETF(accountName: string, bankName: string, bsbNumber: string, accountNumber: string, currency: string, amount: number): Promise<Withdraw>;
    history(limit?: number, since?: number, indexForward?: boolean): Promise<History>;
}
